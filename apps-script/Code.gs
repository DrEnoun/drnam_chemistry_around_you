/**
 * Chemistry Around You · anonymous feedback inbox (Google Apps Script)
 * Each learner device = one row, updated as they learn. No names, emails or student IDs.
 * Setup steps are in README.md, section "Switch on feedback".
 */
const SHEET_NAME = "Feedback";
const STOPS = ["s0", "s1", "s2", "s3", "s4", "s4b", "s5", "s6", "s7", "h1", "e1", "x1"];   // add "s3", "s4", ... as new stops are released

function header_() {
  const h = ["learner_id", "last_update", "learner_type", "chemistry_background", "visits",
             "first_visit", "last_visit", "total_minutes", "recommend_0_10",
             "recall_checks", "recall_correct"];
  STOPS.forEach(s => h.push(s + "_minutes", s + "_completed", s + "_first_try_of_5",
                            s + "_like_1_5", s + "_helpful_1_5", s + "_helped_most",
                            s + "_confusing", s + "_wants_next"));
  h.push("raw_json");
  return h;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const id = String(data.id || "").slice(0, 64);
    if (!/^[A-Za-z0-9.-]{8,64}$/.test(id)) return out_("bad id");
    const r = data.rec || {};
    const raw = JSON.stringify(r);
    if (raw.length > 40000) return out_("too large");

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const head = header_();
    if (sh.getLastRow() === 0) { sh.appendRow(head); sh.setFrozenRows(1); }

    const p = r.profile || {};
    const recall = Array.isArray(r.recall) ? r.recall : [];
    const row = [id, new Date(), clip_(p.type), clip_(p.bg), num_(r.visits),
                 clip_(r.firstVisit), clip_(r.lastVisit), round_((r.totalSec || 0) / 60),
                 typeof r.recommend === "number" ? r.recommend : "",
                 recall.length, recall.filter(x => x && x.correct).length];
    STOPS.forEach(s => {
      const x = (r.stops || {})[s] || {}, t = x.rating || {};
      row.push(round_((x.seconds || 0) / 60), x.completed ? 1 : 0,
               x.firstTry == null ? "" : x.firstTry, t.like || "", t.helpful || "",
               clip_((t.helped || []).join("; ")), clip_(t.confusing), clip_(t.wish));
    });
    row.push(raw);

    const n = sh.getLastRow();
    const ids = n > 1 ? sh.getRange(2, 1, n - 1, 1).getValues().map(v => v[0]) : [];
    const at = ids.indexOf(id);
    if (at >= 0) sh.getRange(at + 2, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
    return out_("ok");
  } catch (err) {
    return out_("error");
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return out_("Chemistry Around You feedback inbox is running."); }

function out_(msg) { return ContentService.createTextOutput(msg); }
function clip_(v) { v = v == null ? "" : String(v); v = v.slice(0, 600); return /^[=+\-@]/.test(v) ? "'" + v : v; }
function num_(v) { return typeof v === "number" ? v : ""; }
function round_(v) { return Math.round(v * 10) / 10; }
