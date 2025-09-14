# Release Notes

## Version 2.5.0 - Major UI & Functionality Update (2025-11-13)

### 🎯 Overview
This release brings significant improvements to the calculator's user interface, data management capabilities, and cost configuration system. The focus has been on improving data accuracy, user workflow efficiency, and fixing critical calculation issues.

### ✨ New Features

#### **1. In-Table Category Selection**
- Added dropdown selector for categories directly in the main data table
- Users can now change use case categories without opening the edit modal
- Full undo/redo support for category changes
- Automatic cost recalculation when category changes

#### **2. In-Table Channel Selection with Cost Display**
- Enhanced channel dropdown to show real-time cost information
- Displays "Cost: $X.XX/contact" directly under each channel selection
- Automatic cost updates when channels are changed
- Full undo/redo support for channel modifications

#### **3. Complete Financial Analysis Section**
- Added comprehensive Financial Analysis tab with advanced financial metrics
- NPV (Net Present Value) calculations with configurable discount rate
- IRR (Internal Rate of Return) calculations
- ROI percentage and payback period calculations
- Monthly and cumulative cash flow visualizations
- Break-even analysis with visual indicators
- Implementation cost configuration (fixed or percentage-based)
- Ongoing monthly costs support
- Interactive cash flow chart showing investment recovery timeline

#### **4. Enhanced Discount Rate Guidance**
- Added comprehensive explanation text for discount rate percentage
- Includes guidance on WACC (Weighted Average Cost of Capital)
- Help text explains typical ranges (8-15%) and factors to consider
- Better user understanding of financial calculations

#### **5. Improved UI Organization**
- Reorganized bulk operations section for better workflow
- Moved "Data Templates" and "Quick Reference Guide" above bulk operations
- Bulk operations now positioned closer to the data table for easier access
- Improved visual hierarchy and user flow

### 🐛 Bug Fixes

#### **1. Analytics Filtering**
- Fixed comprehensive filtering across all analytics views
- All charts and visualizations now properly use filtered data
- Added benefit/metric filter to Financial Analysis tab for consistency
- Resolved issue where filters weren't being applied uniformly

#### **2. Undo/Redo Functionality**
- Fixed undo/redo for gradual change bulk operations
- Changed from shallow copies to deep copies for proper state management
- Now works correctly for all bulk operations including replace and paste
- Resolved state mutation issues that prevented proper undo functionality

#### **3. Cost Configuration Issues**
- Fixed SMS costs showing incorrect values ($5 instead of $1.50)
- Added explicit SMS channel configurations for all categories
- Removed hidden category default costs that weren't visible in UI
- Cleaned up cost hierarchy to match what users can actually configure

#### **4. Modal and Button Errors**
- Fixed "setShowAddModal is not defined" error
- Fixed "setShowBulkEdit is not defined" error
- Corrected function references for proper modal handling
- Fixed "Add Use Case" modal positioning issue

#### **5. Financial Calculations**
- Fixed NPV calculations to match between UI and Excel export
- Corrected IRR calculations for accurate financial metrics
- Fixed payback period calculations for proper month counting
- Ensured all financial metrics align across different views

### 🔧 Technical Improvements

#### **1. Cost Hierarchy Simplification**
- Removed confusing category-level default costs from initial data
- Streamlined cost calculation hierarchy:
  - Category→Channel→SpecialGroup (highest priority)
  - Category→Channel default
  - Channel default (lowest priority)
- All cost configurations now visible and editable in UI

#### **2. State Management**
- Improved deep copy functionality for complex nested objects
- Better handling of undo/redo stack management
- More robust state updates for bulk operations
- Fixed state mutation issues in gradual change operations

#### **3. Data Persistence**
- Enhanced localStorage handling for financial settings
- Better preservation of user configurations across sessions
- Improved data migration for users with existing saved data

### 📊 Data Entry Improvements

#### **1. Faster Category Management**
- Direct category changes without modal interactions
- Immediate visual feedback on cost implications
- Reduced clicks needed for common operations

#### **2. Cost Transparency**
- Real-time cost display in the main table
- Clear indication of which cost configuration is being applied
- Better understanding of cost impact when making changes

### 🎨 UI/UX Enhancements

#### **1. Visual Feedback**
- Clear cost displays under channel selections
- Improved dropdown styling for consistency
- Better visual hierarchy in bulk operations section
- Sticky headers and columns for better navigation

#### **2. Workflow Optimization**
- Logical ordering of UI sections based on usage patterns
- Reduced scrolling between related operations
- More intuitive placement of templates and guides

### 📝 Known Issues
- Multi-select filtering would require significant architectural changes and remains single-select
- Use case filtering in Financial Analysis tab not implemented (would show single items only)

### 🔄 Migration Notes
- Users with existing data may need to clear localStorage if experiencing cost calculation issues
- Category default costs have been removed; systems will fall back to channel defaults
- All SMS costs now properly configured at $1.50 per contact

---

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