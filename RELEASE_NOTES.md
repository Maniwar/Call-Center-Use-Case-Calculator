# Release Notes

## Version 2.1.0 - Export Functions Enhancement (2025-09-12)

### 🎯 Overview
Major improvements to all export functions with focus on Excel formula accuracy, object serialization fixes, and enhanced Analytics export capabilities.

### ✨ New Features

#### **Analytics Excel Export**
- Added Excel export button to all Analytics views (Overall, Category, Channel, Benefit, Use Case, Special Group)
- Generates Excel files with live formulas that auto-calculate
- Formulas adjust based on metric type for accurate calculations
- Supports percentage calculations and totals

### 🐛 Bug Fixes

#### **Critical: Object Serialization Issues**
- **Fixed**: `[object Object]` appearing in CSV and Excel exports
- **Impact**: Channel costs can now be either simple numbers or complex objects with `{value, costType, ahtMinutes}`
- **Solution**: Added helper functions to properly extract values from channel cost objects

#### **Excel Formula Accuracy**
- **Fixed**: AHT formulas using hardcoded value of 10 instead of actual AHT
- **Impact**: AHT calculations now properly use configured AHT values per use case
- **Example**: Formula now shows `=G10*MIN(J10,8.00)*0.7500` for 8-minute AHT instead of hardcoded 10

#### **Missing Metric Types in Excel**
- **Fixed**: Transfer Rate Reduction, Self-Service Resolution, and other metrics falling through to wrong formulas
- **Impact**: All metric types now generate correct Excel formulas matching UI calculations
- **Solution**: Centralized metric configuration in METRIC_CONFIG object

### 🔧 Technical Improvements

#### **Code Maintainability**
1. **Helper Functions Added**:
   - `getChannelCostValue(channel)` - Extracts cost value from channel object
   - `getChannelCostType(channel)` - Gets cost type (hourly/perContact)
   - `getChannelAHT(channel)` - Gets AHT minutes with fallback to default

2. **Centralized Configuration**:
   - METRIC_CONFIG object serves as single source of truth
   - All metric types, formulas, and Excel formula generators in one place
   - Easy to add new metrics without code duplication

3. **Formula Generation**:
   - Consistent formula generation between JavaScript and Excel
   - Type-based calculation dispatch
   - Proper handling of all edge cases

### 📊 Export Functions Summary

#### **Data Entry Tab Exports**
| Export Type | Description | Format |
|------------|-------------|---------|
| Export to CSV | Comprehensive data dump with all calculations | CSV |
| Export to Excel | Full export with live formulas that auto-calculate | XLS with formulas |
| Export to JSON | Complete application state for backup/restore | JSON |
| Export Cost Configuration | Cost hierarchy and special groups configuration | CSV |

#### **Analytics Tab Exports** 
| Export Type | Description | Format |
|------------|-------------|---------|
| Export CSV | Current analytics view data | CSV |
| Export Excel | Current view with live formulas | XLS with formulas |

### 🔍 What Each Export Includes

#### **Excel Export (Main)**
- All use cases with monthly data
- Live formulas for Net Improvement: `=MAX(0,H${row}-I${row})`
- Metric-specific savings formulas:
  - Percentage metrics: `=G${row}*(J${row}/100)*K${row}`
  - AHT reduction: `=G${row}*MIN(J${row},${aht})*${costPerMinute}`
  - FCR special: `=G${row}*(J${row}/100)*K${row}*0.3`
  - Value metrics: `=G${row}*J${row}*${value}`
- Summary totals with SUM formulas

#### **Analytics Excel Export**
- Filtered data based on current view and date range
- Aggregated or detailed view depending on analytics type
- Live formulas for calculations and percentages
- Auto-calculating totals

### 🎯 Key Formulas by Metric Type

| Metric Type | JavaScript Formula | Excel Formula |
|------------|-------------------|---------------|
| Deflection/Automation | `volume * (improvement% - baseline%) * cost` | `=G{row}*(J{row}/100)*K{row}` |
| AHT Reduction | `volume * MIN(minutes, aht) * costPerMinute` | `=G{row}*MIN(J{row},{aht})*{rate}` |
| FCR Improvement | `volume * (improvement% - baseline%) * cost * 0.3` | `=G{row}*(J{row}/100)*K{row}*0.3` |
| NPS Points | `volume * points * valuePerPoint` | `=G{row}*J{row}*{value}` |
| CSAT/Agent Retention | `volume * (improvement% / 100) * value` | `=G{row}*(J{row}/100)*{value}` |

### 🚀 Performance Improvements
- Reduced code duplication through helper functions
- More efficient object property access
- Consistent error handling across all exports

### 📝 Migration Guide
No migration required. All existing data and exports will automatically use the improved functions.

### 🔒 Backward Compatibility
- All existing exports remain functional
- JSON import/export fully backward compatible
- No changes to data structure

### 🧪 Testing Checklist
- [x] Excel formulas calculate correctly when opened
- [x] No `[object Object]` in any exports
- [x] AHT values properly reflected in formulas
- [x] All metric types generate correct formulas
- [x] Analytics Excel export works for all views
- [x] Totals in Excel match UI totals

### 📚 Documentation
- Inline code comments added for maintainability
- METRIC_CONFIG documented with usage instructions
- Helper functions documented with JSDoc comments

### 🙏 Acknowledgments
Thanks to the user for identifying the Excel formula issues and providing detailed feedback with screenshots for debugging.

---

## Version 2.0.0 - Previous Release
- Multi-benefit support
- Cost hierarchy system
- Analytics dashboard
- Bulk operations

---

*For questions or issues, please open an issue on GitHub.*