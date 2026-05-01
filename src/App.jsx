import { useCallback, useEffect, useState } from "react";
import {
  getCsvDownloadUrl,
  getDetails,
  getDevice,
  getPageReport,
  getSummary,
  getTimeline,
} from "./api/navClickApi";
import DetailsTable from "./components/DetailsTable";
import DeviceChart from "./components/DeviceChart";
import PageTable from "./components/PageTable";
import Pagination from "./components/Pagination";
import ReportFilters from "./components/ReportFilters";
import SummaryCards from "./components/SummaryCards";
import SummaryChart from "./components/SummaryChart";
import SummaryTable from "./components/SummaryTable";
import TimelineChart from "./components/TimelineChart";
import "./styles.css";
import { openCsvDownload } from "./utils/exportCsv";

function getDefaultFromDate() {
  const today = new Date();
  const before = new Date();
  before.setDate(today.getDate() - 30);
  return before.toISOString().slice(0, 10);
}

function getDefaultToDate() {
  return new Date().toISOString().slice(0, 10);
}

export default function App() {
  const [fromDate, setFromDate] = useState(getDefaultFromDate());
  const [toDate, setToDate] = useState(getDefaultToDate());
  const [menuScope, setMenuScope] = useState("main_navigation");
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [summaryData, setSummaryData] = useState({
    total_clicks: 0,
    top_nav_text: "",
    top_nav_clicks: 0,
    items: [],
  });

  const [detailsData, setDetailsData] = useState({
    meta: {
      page: 1,
      total_pages: 1,
      total: 0,
      limit: 100,
    },
    items: [],
  });

  const [timelineData, setTimelineData] = useState({
    total_clicks: 0,
    items: [],
  });

  const [deviceData, setDeviceData] = useState({
    total_clicks: 0,
    items: [],
  });

  const [pageData, setPageData] = useState({
    total_clicks: 0,
    items: [],
  });

  const getCommonParams = useCallback(() => {
    return {
      from: fromDate,
      to: toDate,
      menu_scope: menuScope,
    };
  }, [fromDate, toDate, menuScope]);

  const loadReportData = useCallback(
    async (customPage = 1) => {
      setLoading(true);
      setError("");

      try {
        const commonParams = getCommonParams();

        const [
          summaryResponse,
          detailsResponse,
          timelineResponse,
          deviceResponse,
          pageResponse,
        ] = await Promise.all([
          getSummary(commonParams),
          getDetails({
            ...commonParams,
            page: customPage,
            limit,
            sort: "clicked_at",
            order: "desc",
          }),
          getTimeline(commonParams),
          getDevice(commonParams),
          getPageReport(commonParams),
        ]);

        setSummaryData(
          summaryResponse.data || {
            total_clicks: 0,
            top_nav_text: "",
            top_nav_clicks: 0,
            items: [],
          },
        );

        setDetailsData({
          meta: detailsResponse.meta || {
            page: 1,
            total_pages: 1,
            total: 0,
            limit,
          },
          items: detailsResponse.items || [],
        });

        setTimelineData(
          timelineResponse.data || {
            total_clicks: 0,
            items: [],
          },
        );

        setDeviceData(
          deviceResponse.data || {
            total_clicks: 0,
            items: [],
          },
        );

        setPageData(
          pageResponse.data || {
            total_clicks: 0,
            items: [],
          },
        );

        setPage(customPage);
      } catch (err) {
        console.error(err);
        setError("Fehler beim Laden der Report-Daten.");
      } finally {
        setLoading(false);
      }
    },
    [getCommonParams, limit],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadReportData(1);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadReportData]);

  function handleLoad() {
    loadReportData(1);
  }

  function handlePageChange(newPage) {
    loadReportData(newPage);
  }

  function handleExportCsv() {
    const csvUrl = getCsvDownloadUrl(getCommonParams());
    openCsvDownload(csvUrl);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className={`page ${loading ? "loading" : ""}`}>
      <header className="page-header">
        <h1>Navigation Report Print Equipment</h1>
      </header>

      {error ? <div className="error-box">{error}</div> : null}

      <ReportFilters
        fromDate={fromDate}
        toDate={toDate}
        menuScope={menuScope}
        limit={limit}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onMenuScopeChange={setMenuScope}
        onLimitChange={setLimit}
        onLoad={handleLoad}
        onExportCsv={handleExportCsv}
        onPrint={handlePrint}
      />

      <SummaryCards
        totalClicks={summaryData.total_clicks}
        topNavText={summaryData.top_nav_text}
        topNavClicks={summaryData.top_nav_clicks}
      />

      <SummaryChart items={summaryData.items || []} />
      <TimelineChart items={timelineData.items || []} />
      <DeviceChart items={deviceData.items || []} />
      <SummaryTable items={summaryData.items || []} />
      <PageTable items={pageData.items || []} />
      <DetailsTable items={detailsData.items || []} />

      <Pagination
        page={detailsData.meta?.page || 1}
        totalPages={detailsData.meta?.total_pages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
