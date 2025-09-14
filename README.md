# AI Contact Center ROI Calculator

A comprehensive, single‑file HTML application for evaluating AI ROI in contact centers. It includes advanced cost modeling with nested special groups, agent utilization and AHT handling, powerful bulk editing, spreadsheet‑style paste, undo/redo, templates, multi‑dimensional analytics with interactive charts, complete financial analysis with NPV/IRR/ROI calculations, and detailed CSV/Excel exports.

## Features

### 📊 Advanced Cost Modeling
- 4‑level cost hierarchy: Channel defaults → Category defaults → Category‑Channel overrides → Special Groups (nested within category–channel pairs)
- Flexible pricing models: per‑contact or hourly at every level
- Agent utilization factor: adjust for non‑productive time (60–85% typical)
- Smart conversion: hourly → per‑contact via AHT and utilization
- Cost source transparency: shows which tier provided the effective cost

### 🧩 Multi‑Benefit Use Cases
- Each use case can include 1+ benefits/metrics with baselines
- Supported metrics: AHT Reduction (min), Deflection, Automation, Self‑Service Resolution, Transfer Reduction, NPS Improvement (points), CSAT Improvement (%), FCR Improvement (%), Conversion Rate (%), Agent Retention (%), Compliance Rate (%)
- Per‑benefit inputs: separate volume/improvement fields and baselines
- Per‑benefit sub‑totals: inline savings shown next to each benefit when a use case has multiple benefits
- Use‑case totals: month totals and all‑months totals with optional per‑benefit breakdown

### ⚡ Bulk Edit Mode
- Select multiple use cases and apply actions:
  - Clear, duplicate, or delete selected
  - Batch updates: change Category, Channel, or Special Group for selected
  - Fill Down engine with three modes:
    - Constant: replace values
    - Adjust: add/subtract deltas
    - Gradual: start→end over months with curve types
      - Curves: Linear, Exponential, Stepped, Custom Milestones (e.g., months 3/6/9)
  - Per‑metric "apply" buttons: Volume only, Improvement only, or Both
- Spreadsheet‑style paste: paste volume + improvements directly from Excel/Sheets (Ctrl/Cmd+V)
- Undo/Redo: keyboard shortcuts (Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z or Y) - now with deep copy support
- Select‑all: Ctrl/Cmd+A in bulk edit
- Visual hints for unsaved changes and quick‑action buttons per cell

### 🎯 In-Table Editing
- **Direct Category Selection**: Change categories via dropdown without opening modals
- **Direct Channel Selection**: Change channels with real-time cost display
- **Cost Transparency**: See "Cost: $X.XX/contact" directly under channel dropdowns
- **Special Group Selection**: Modify special groups inline
- **Full Undo/Redo Support**: All inline changes tracked in history

### 🧪 Templates
- Save the current set of use cases (structure only, without data values) as a named template
- Load or delete templates from the UI to bootstrap scenarios quickly

### 📈 Analytics & Reporting
- Views: Overall, Category, Channel, Use Case, Special Group, Benefit/Metric
- Charts: monthly trend, cumulative savings, distributions, and rankings
- Filters: Category, Channel, Special Group, Metric; custom analytics date range
- "Top contributor" and benefit‑level breakdowns per use case
- CSV and Excel exports with live formulas that auto-calculate
- Comprehensive multi‑section exports covering:
  - Multi‑benefit calculations per use case and month (with formulas, costs, and value‑driver types)
  - Per‑benefit input snapshots and step‑by‑step calculation details
  - Monthly totals, category totals, channel totals, special‑group summaries
  - Use case rankings, performance tables, and contribution breakdowns

### 💰 Financial Analysis
- **NPV (Net Present Value)**: Calculate present value with configurable discount rate (8-15% typical)
- **IRR (Internal Rate of Return)**: Determine the rate at which NPV equals zero
- **ROI Percentage**: Total return on investment over the analysis period
- **Payback Period**: Months to recover initial investment
- **Cash Flow Analysis**: Monthly and cumulative cash flow visualizations
- **Break-Even Analysis**: Visual indicators showing when investment is recovered
- **Implementation Costs**: Fixed amount or percentage of first-year savings
- **Ongoing Costs**: Monthly operational costs with flexible billing cycles
- **WACC Guidance**: Built-in help for determining appropriate discount rates

### 💾 Data Management
- Auto‑save to localStorage
- JSON import/export for backups and sharing
- Robust validation and helpful error messages

### 📖 User Experience
- Input Guidance tab with industry benchmarks and best practices for each metric
- Data Templates and Quick Reference Guide positioned for optimal workflow
- Responsive design and keyboard‑friendly editing
- Sticky headers and columns for easy navigation in large datasets
- Real-time cost calculations and visual feedback

## Quick Start

**Simply open `calculator.html` in any modern web browser!**

No installation, no build process, no dependencies to manage. The application runs entirely in the browser.

## Technology Stack

- React 18 (CDN)
- Tailwind CSS (CDN)
- Chart.js 4.x (CDN)
- Babel Standalone (CDN) for JSX in the browser
- Local Storage API for persistence

## File Structure

```
├── calculator.html    # Main application (standalone)
├── README.md          # This file
├── LICENSE            # MIT License
└── export_test.*      # Example export artifacts (optional)
```

All functionality is contained in the single `calculator.html` file; there is no build step.

## Key Concepts

### 4-Level Cost Hierarchy
The application uses a sophisticated cost model with clear priority order:

1. **Special Groups** (Highest Priority)
   - Nested within specific category-channel combinations
   - Example: "Senior Agents" for "Technical Support" + "Phone" channel
   - Can have different costs per category-channel combination

2. **Category-Channel Overrides** 
   - Override defaults for specific category-channel pairs
   - Example: "Pre-Sales" category via "Chat" channel costs more than email

3. **Category Defaults**
   - Default costs for entire business categories
   - Example: "Technical Support" has different base costs than "Order Support"

4. **Channel Defaults** (Lowest Priority)
   - Fallback costs when no higher-level override exists
   - Example: Phone = $6, Chat = $2.50, Email = $4, etc.

### Agent Utilization
Real contact centers factor in non-productive time:
- **Utilization Rate**: Percentage of time agents spend on productive work (60-85% typical)
- **Impact**: Lower utilization = higher true cost per contact
- **Formula**: `True Hourly Cost = Base Hourly Rate × (100 / Utilization %)`
- **Example**: $20/hr at 75% utilization = $26.67/hr effective rate

### Pricing Models
Each cost level supports two pricing approaches:
- **Per-Contact**: Direct cost per interaction (e.g., $8 per contact)
- **Hourly**: Agent wage converted using AHT and utilization
  - Formula: `Per-Contact Cost = (Hourly Rate × AHT minutes ÷ 60) × Utilization Factor`
  - Example: $20/hr × 15min ÷ 60 × 1.33 utilization = $6.65 per contact

### Calculation Formulas

**Deflection/Automation/Resolution/Transfer Metrics:**
```
Savings = Volume × (Improvement% - Baseline%) × Effective Cost per Contact
```

**AHT Reduction Metric:**
```  
Savings = Volume × Minutes Saved × (Effective Cost per Contact ÷ AHT minutes)
```

**Cost Priority Logic:**
The system automatically selects the most specific cost available:
1. Special Group cost for the use case's category-channel (if assigned)
2. Category-Channel override cost (if configured)  
3. Category default cost (if configured)
4. Channel default cost (always available)

## Usage Guide

### Initial Setup
1. **Configure Basic Settings**
   - Click the ⚙️ Settings icon in the top-right
   - Set **Default AHT** (Average Handle Time in minutes)
   - Set **Agent Utilization** percentage (75% recommended)
   - Configure **Channel Default Costs** for your 6 channels

2. **Set Up Cost Structure** 
   - Add **Categories** (e.g., "Technical Support", "Pre-Sales", "Order Support")
   - For each category, optionally set **Category-Channel Overrides**
   - Add **Special Groups** within specific category-channel combinations
   - Toggle between **Hourly** and **Per-Contact** pricing as needed

3. **Define Analysis Period**
   - Set start and end dates for your ROI analysis
   - The system will generate month-by-month tracking

### Creating Use Cases
4. **Add AI Use Cases**
   - Click **"Add Use Case"** in the Data Entry tab
   - Select **Category** and **Channel** 
   - Choose **Special Group** (if applicable - dropdown shows only relevant groups)
   - Pick **Metric Type** and set **Baseline Value**
   - Save the use case

5. **Input Monthly Data**
   - For each use case, enter monthly **Volume** and **Improvement** values
   - The system calculates net improvement (improvement - baseline)
   - Savings are computed using the appropriate cost hierarchy

### Bulk Edit Mode

Open the Bulk Operations panel in the Data Entry tab when at least one use case is selected.

- Quick Actions: Clear, Duplicate, and Delete selected use cases
- Fill Down: choose mode (Constant, Adjust, or Gradual), pick curve (Linear/Exponential/Stepped/Custom), and apply per‑metric or “Apply All”
- Batch Updates: change Category, Channel, Special Group for the selected set
- Keyboard Shortcuts: Ctrl/Cmd+Z (Undo), Ctrl/Cmd+Shift+Z or Y (Redo), Ctrl/Cmd+A (Select All)
- Copy & Paste: paste directly from spreadsheets; first row/column conventions are handled automatically

### Templates

Save the current use‑case structure as a template (no data values). Load a template at any time to start a new scenario.

### Analysis & Reporting
6. **Review Analytics**
   - Switch to **Analytics** tab for interactive charts
   - View by **Category**, **Channel**, **Use Case**, **Special Group**, or **Benefit/Metric**
   - Apply filters to focus on specific time periods or segments
   - Analyze trends, distributions, and top contributors

7. **Financial Analysis**
   - Navigate to **Financial Analysis** tab for investment metrics
   - Configure **discount rate** (WACC guidance provided)
   - Set **implementation costs** (fixed or percentage-based)
   - Add **ongoing monthly costs** if applicable
   - Review NPV, IRR, ROI, and payback period
   - Examine cash flow charts and break-even timeline

8. **Export Results**
   - Generate detailed **CSV reports** with calculation transparency
   - Export to **Excel with live formulas** that auto-calculate
   - Download **JSON backups** for data portability
   - Reports show cost sources, formulas, and utilization factors
   - Financial metrics included in comprehensive exports

### Advanced Features
- Edit Use Cases: modify category, channel, benefits, and baselines at any time
- Cost Transparency: exports include the cost source and formula used
- Smart Validation: prevents mismatched special‑group assignments
- Auto‑Save: changes persist automatically in the browser

## Example Scenarios

### Scenario 1: Technical Support Deflection
- **Setup**: Technical Support category, Phone channel, "Tier 2" special group
- **Costs**: $25/hour with 12-minute AHT at 75% utilization
- **Calculation**: $25 × (12/60) × (100/75) = $6.67 per contact
- **Use Case**: 85% deflection rate with 10% baseline → 75% net improvement
- **Monthly Volume**: 500 contacts
- **Savings**: 500 × 75% × $6.67 = **$2,501 per month**

### Scenario 2: Pre-Sales Chat Automation  
- **Setup**: Pre-Sales category, Chat channel, no special group
- **Costs**: $4.50 per contact (direct per-contact pricing)
- **Use Case**: 60% automation rate with 5% baseline → 55% net improvement
- **Monthly Volume**: 800 contacts  
- **Savings**: 800 × 55% × $4.50 = **$1,980 per month**

### Scenario 3: AHT Reduction for Order Support
- **Setup**: Order Support category, Email channel
- **Costs**: $18/hour with 8-minute AHT at 80% utilization  
- **Calculation**: $18 × (8/60) × (100/80) = $3.00 per contact
- **Use Case**: 3-minute AHT reduction (from 8min baseline)
- **Monthly Volume**: 1,200 contacts
- **Per-minute cost**: $3.00 ÷ 8 = $0.375 per minute
- **Savings**: 1,200 × 3 × $0.375 = **$1,350 per month**

## Best Practices

### Cost Configuration
- **Start Simple**: Begin with channel defaults, add complexity as needed
- **Use Industry Benchmarks**: 
  - Phone: $6-8 per contact or $20-35/hour
  - Chat: $2-4 per contact or $15-25/hour  
  - Email: $3-5 per contact or $18-28/hour
- **Factor Utilization**: Most centers operate at 65-80% utilization
- **Regular Updates**: Review and adjust costs quarterly

### Use Case Design
- **Set Realistic Baselines**: Use current performance as baseline (not zero)
- **Conservative Projections**: Better to under-promise and over-deliver
- **Segment Appropriately**: Different categories may have different improvement potentials
- **Track Leading Indicators**: Monitor volume trends and early performance signals

### Analysis & Reporting
- **Multi-dimensional Views**: Analyze by category, channel, and time period
- **Variance Analysis**: Compare projected vs. actual improvements
- **Cost Transparency**: Always show calculation sources in reports
- **Stakeholder Communication**: Use charts and summaries for executive reporting

## Browser Compatibility

- **Chrome 90+** ✅ Full support
- **Firefox 88+** ✅ Full support  
- **Safari 14+** ✅ Full support
- **Edge 90+** ✅ Full support
- **Mobile browsers** ✅ Responsive design

## Privacy & Offline

- All data is stored in your browser; no server required.
- The app uses CDN links for React/Tailwind/Chart.js/Babel. An internet connection is required to load those libraries for the first time.

## Troubleshooting

### Common Issues
- **Charts not loading**: Ensure Chart.js CDN is accessible
- **Data not saving**: Check browser local storage permissions
- **Special groups not appearing**: Verify category-channel combination exists
- **Incorrect calculations**: Check agent utilization and AHT settings

### Performance
- Designed to handle large scenarios efficiently
- Browser storage: ~5–10MB typical usage
- Export size: CSV files scale with data volume

## Contributing & Support

This is a standalone application designed for self-service use. For customizations or enterprise features:

- Fork the repository for custom modifications
- CSV exports provide full calculation transparency
- JSON exports enable data integration with other systems
- All calculation logic is visible in the single HTML file

## License

MIT License - See LICENSE file for details
