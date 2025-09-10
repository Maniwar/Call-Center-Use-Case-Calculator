# AI Contact Center ROI Calculator

A comprehensive standalone HTML application for evaluating AI implementation ROI in contact centers, featuring advanced cost modeling with nested special groups, agent utilization factors, and multi-dimensional analytics with interactive charts.

## Features

### 📊 **Advanced Cost Modeling**
- **4-Level Cost Hierarchy**: Channel defaults → Category defaults → Category-Channel overrides → Special Groups (nested within category-channels)
- **Flexible Pricing Models**: Support for both hourly rates and per-contact pricing across all levels
- **Agent Utilization Factor**: Account for non-productive time (breaks, training, idle time) with adjustable utilization rates (60-85% typical)
- **Smart Cost Calculation**: Automatic conversion from hourly rates to per-contact costs using AHT and utilization factors

### 📈 **Comprehensive Metric Tracking**
- **Deflection Rate (%)**: Percentage of contacts handled without agent involvement
- **AHT Reduction (min)**: Minutes saved per contact through AI assistance  
- **Automation Rate (%)**: Percentage of tasks fully automated
- **Self-Service Resolution (%)**: Percentage resolved through self-service
- **Transfer Rate Reduction (%)**: Reduction in transfer rates between agents
- **Baseline Value Support**: Set baseline performance for accurate net improvement calculations

### ⚡ **Multi-Channel Support**
- **6 Communication Channels**: Phone, Chat, Email, SMS, Social, Bot
- **Channel-Specific Costs**: Different cost structures per channel
- **Context-Aware Special Groups**: Special groups are specific to category-channel combinations

### 📋 **Advanced Analytics & Reporting**
- **Interactive Charts**: Monthly trends, cumulative savings, category/channel/use case breakdowns
- **Multi-dimensional Views**: Analyze by category, channel, use case, or special group
- **Transparent Calculations**: CSV exports show detailed formulas and cost sources
- **Performance Tracking**: Monthly volume and improvement tracking with trend analysis

### 💾 **Data Management**
- **Auto-save Functionality**: Real-time local storage backup
- **Import/Export**: JSON backup and restore capabilities
- **CSV Reports**: Detailed exports with calculation transparency
- **Data Validation**: Built-in validation and error handling

### 📖 **User Experience**
- **Input Guidance**: Built-in industry benchmarks and best practices
- **Cost Source Transparency**: Clear indication of which cost tier is being used
- **Smart UI**: Context-aware dropdowns and dynamic form validation
- **Responsive Design**: Works on desktop and mobile browsers

## Quick Start

**Simply open `calculator.html` in any modern web browser!**

No installation, no build process, no dependencies to manage. The application runs entirely in the browser.

## Technology Stack

- **React 18**: Via CDN for component-based UI with hooks and modern patterns
- **Tailwind CSS**: Via CDN for utility-first styling and responsive design
- **Chart.js 4.x**: For interactive data visualizations with modern chart types
- **Babel Standalone**: For real-time JSX compilation in browser
- **Local Storage API**: For automatic client-side data persistence and recovery

## File Structure

```
├── calculator.html       # 🎯 Main application (standalone)
├── src/                  # 📁 Development reference structure
├── package.json          # 📦 Development dependencies (optional)
└── README.md            # 📖 This file
```

**⚠️ Important**: The `src/` directory is for development reference only. All functionality is contained in the single `calculator.html` file.

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

### Analysis & Reporting
6. **Review Analytics**
   - Switch to **Analytics** tab for interactive charts
   - View by **Category**, **Channel**, **Use Case**, or **Special Group**
   - Apply filters to focus on specific time periods or segments

7. **Export Results**
   - Generate detailed **CSV reports** with calculation transparency
   - Download **JSON backups** for data portability
   - Reports show cost sources, formulas, and utilization factors

### Advanced Features
- **Edit Use Cases**: Modify category, channel, or special group assignments
- **Cost Transparency**: Hover over costs to see calculation sources
- **Smart Validation**: System prevents invalid special group assignments
- **Auto-Save**: All changes saved automatically to browser storage

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

## Troubleshooting

### Common Issues
- **Charts not loading**: Ensure Chart.js CDN is accessible
- **Data not saving**: Check browser local storage permissions
- **Special groups not appearing**: Verify category-channel combination exists
- **Incorrect calculations**: Check agent utilization and AHT settings

### Performance
- **Large datasets**: Application handles 1000+ use cases efficiently
- **Browser storage**: ~5-10MB typical usage, no server required
- **Export size**: CSV files scale with data volume

## Contributing & Support

This is a standalone application designed for self-service use. For customizations or enterprise features:

- Fork the repository for custom modifications
- CSV exports provide full calculation transparency
- JSON exports enable data integration with other systems
- All calculation logic is visible in the single HTML file

## License

MIT License - See LICENSE file for details