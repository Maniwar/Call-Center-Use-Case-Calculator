# Test Template Verification Guide

## How to Test

1. Open calculator.html in your browser
2. Click on "Load Template" in the Templates section
3. Select "Comprehensive Test Suite"
4. Review the calculated values in the Data Entry tab

## Expected Calculations

### Test Case 1: Deflection (Phone)
- **Volume**: 1000 contacts
- **Improvement**: 50% deflection
- **Baseline**: 10%
- **Net Improvement**: 40%
- **Channel Cost**: $6/contact (phone default)
- **Expected Savings**: 1000 × 0.40 × $6 = **$2,400**

### Test Case 2: AHT Reduction (Chat) with Tier 1
- **Volume**: 500 contacts
- **Improvement**: 5 minutes
- **Baseline**: 2 minutes
- **Net Improvement**: 3 minutes
- **Channel Cost**: $2.50/contact (chat default)
- **AHT**: 10 minutes default
- **Cost per minute**: $2.50/10 = $0.25
- **Expected Savings**: 500 × 3 × $0.25 = **$375**
- *Note: Should use Tier 1 special group cost if configured*

### Test Case 3: FCR Improvement (Email)
- **Volume**: 800 contacts
- **Improvement**: 85% FCR
- **Baseline**: 70% FCR
- **Net Improvement**: 15%
- **Channel Cost**: $4/contact (email default)
- **Expected Savings**: 800 × 0.15 × $4 = **$480**

### Test Case 4: NPS Improvement (Phone)
- **Volume**: 200 surveys (NOT contacts)
- **Improvement**: 5 points
- **Baseline**: 0 points
- **Net Improvement**: 5 points
- **NPS Value**: $100/point (template override)
- **Expected Value**: 200 × 5 × $100 = **$100,000**

### Test Case 5: Conversion Rate (Chat)
- **Volume**: 100 opportunities (NOT contacts)
- **Improvement**: 15% conversion
- **Baseline**: 5% conversion
- **Net Improvement**: 10%
- **Deal Value**: $500 (template override)
- **Expected Value**: 100 × 0.10 × $500 = **$5,000**

### Test Case 6: Agent Retention (Phone) with Offshore
- **Volume**: 50 agents (NOT contacts)
- **Improvement**: 90% retention
- **Baseline**: 80% retention
- **Net Improvement**: 10%
- **Replacement Cost**: $10,000/agent (template override)
- **Expected Savings**: 50 × 0.10 × $10,000 = **$50,000**
- *Note: Should use Offshore special group values if configured*

### Test Case 7: Multi-Benefit Case (Bot)
This tests multiple benefits with different volume types:

1. **Deflection Component**:
   - Volume: 2000 contacts
   - Net Improvement: 40% (60% - 20% baseline)
   - Bot Cost: $0.50/contact
   - Savings: 2000 × 0.40 × $0.50 = **$400**

2. **NPS Component**:
   - Volume: 150 surveys
   - Net Improvement: 3 points
   - Value: 150 × 3 × $100 = **$45,000**

3. **AHT Component**:
   - Volume: 1500 contacts
   - Net Improvement: 3 minutes (4 - 1 baseline)
   - Cost/min: $0.50/10 = $0.05
   - Savings: 1500 × 3 × $0.05 = **$225**

   **Total for Multi-Benefit**: $45,625

### Test Case 8: Zero Baseline (SMS)
- **Volume**: 300 contacts
- **Improvement**: 75% automation
- **Baseline**: 0%
- **Net Improvement**: 75%
- **SMS Cost**: $1.50/contact
- **Expected Savings**: 300 × 0.75 × $1.50 = **$337.50**

### Test Case 9: High Baseline (Social) with Tier 2
- **Volume**: 400 contacts
- **Improvement**: 80% self-service
- **Baseline**: 50%
- **Net Improvement**: 30% (capped)
- **Social Cost**: $3/contact
- **Expected Savings**: 400 × 0.30 × $3 = **$360**
- *Note: Should use Tier 2 special group cost if configured*

## Total Expected Value
Sum of all test cases for month-1: **~$203,897.50**

## What This Tests

1. ✅ **Different Volume Types**: Contacts vs Surveys vs Agents vs Opportunities
2. ✅ **Cost Hierarchy**: Channel defaults, Special Groups (Tier 1, Tier 2, Offshore)
3. ✅ **Metric Value Overrides**: Template includes higher values than defaults
4. ✅ **Multiple Benefits**: One use case with 3 different benefit types
5. ✅ **Edge Cases**: Zero baseline, high baseline scenarios
6. ✅ **All Channels**: Phone, Chat, Email, SMS, Social, Bot
7. ✅ **All Categories**: Pre-Sales, Order Support, Technical Support, Customer Service

## How to Verify

1. Load the template and check the total savings shown
2. Export to CSV to see detailed calculations
3. Check that volume labels show correctly (Contacts, Surveys, Agents, etc.)
4. Verify special group costs are applied when configured
5. Confirm metric values use template overrides ($100 for NPS, not default $50)

## Troubleshooting

If values don't match:
1. Check Settings > Channel Default Costs
2. Verify Special Group configurations
3. Ensure AHT is set to 10 minutes (default)
4. Check that Agent Utilization is 75% (for hourly calculations)
5. Export CSV and review the "Calculation Verification" section