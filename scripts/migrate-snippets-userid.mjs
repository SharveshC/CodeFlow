import admin from 'firebase-admin';

function parseArgs(argv) {
  const args = {
    projectId: null,
    dryRun: false,
    deleteOldField: true,
    limit: 500,
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--keep-old') args.deleteOldField = false;
    else if (a === '--project') args.projectId = argv[++i] || null;
    else if (a === '--limit') args.limit = Number(argv[++i] || '500');
  }

  if (!Number.isFinite(args.limit) || args.limit <= 0 || args.limit > 500) {
    throw new Error('--limit must be a number between 1 and 500');
  }

  return args;
}

async function main() {
  const { projectId, dryRun, deleteOldField, limit } = parseArgs(process.argv);

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      ...(projectId ? { projectId } : {}),
    });
  }

  const db = admin.firestore();

  let updated = 0;
  let scanned = 0;

  let lastDoc = null;

  while (true) {
    let q = db.collection('snippets').orderBy(admin.firestore.FieldPath.documentId()).limit(limit);
    if (lastDoc) q = q.startAfter(lastDoc);

    const snap = await q.get();
    if (snap.empty) break;

    const batch = db.batch();
    let batchWrites = 0;

    for (const doc of snap.docs) {
      scanned++;
      const data = doc.data();

      const hasUserId = typeof data.userId === 'string' && data.userId.length > 0;
      const legacyUserId = typeof data.user_id === 'string' && data.user_id.length > 0 ? data.user_id : null;

      if (!hasUserId && legacyUserId) {
        const update = {
          userId: legacyUserId,
          ...(deleteOldField ? { user_id: admin.firestore.FieldValue.delete() } : {}),
        };

        if (!dryRun) {
          batch.update(doc.ref, update);
          batchWrites++;
        }

        updated++;
      }

      lastDoc = doc;
    }

    if (!dryRun && batchWrites > 0) {
      await batch.commit();
    }

    if (snap.size < limit) break;
  }

  process.stdout.write(
    JSON.stringify(
      {
        ok: true,
        dryRun,
        deleteOldField,
        scanned,
        migrated: updated,
      },
      null,
      2
    ) + '\n'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
