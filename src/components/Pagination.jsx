export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Zurück
      </button>

      <span>
        Seite {page} von {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Weiter
      </button>
    </div>
  );
}
