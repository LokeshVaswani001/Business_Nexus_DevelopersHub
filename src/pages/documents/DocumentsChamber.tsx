import React, { useState } from 'react';

type DocStatus = 'Draft' | 'In Review' | 'Signed';

const DocumentChamber: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<DocStatus>('Draft');

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Document Chamber</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={e => setFile(e.target.files?.[0] || null)}
      />

      {file && (
        <div className="border p-4 rounded space-y-2">
          <p className="font-medium">{file.name}</p>
          <span className="px-2 py-1 text-sm bg-gray-200 rounded">
            {status}
          </span>

          <div className="flex gap-2">
            <button onClick={() => setStatus('Draft')} className="btn-secondary">
              Draft
            </button>
            <button onClick={() => setStatus('In Review')} className="btn-secondary">
              In Review
            </button>
            <button onClick={() => setStatus('Signed')} className="btn-primary">
              Signed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentChamber;
