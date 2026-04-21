export default function ReportFilters({
  fromDate,
  toDate,
  menuScope,
  limit,
  onFromDateChange,
  onToDateChange,
  onMenuScopeChange,
  onLimitChange,
  onLoad,
  onExportCsv,
  onPrint,
}) {
  return (
    <div className="card">
      <div className="filters-row">
        <label>
          Von
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
          />
        </label>

        <label>
          Bis
          <input
            type="date"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
          />
        </label>

        <label>
          Scope
          <select
            value={menuScope}
            onChange={(e) => onMenuScopeChange(e.target.value)}
          >
            <option value="main_navigation">main_navigation</option>
            <option value="flyout_navigation">flyout_navigation</option>
            <option value="mobile_navigation">mobile_navigation</option>
            <option value="sticky_navigation">sticky_navigation</option>
          </select>
        </label>

        <label>
          Details Limit
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
          </select>
        </label>

        <button onClick={onLoad}>Daten laden</button>
        <button onClick={onExportCsv}>CSV Export</button>
        <button onClick={onPrint}>PDF / Drucken</button>
      </div>
    </div>
  );
}
