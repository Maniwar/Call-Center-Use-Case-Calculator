// Test Excel Export Formula Accuracy
console.log("=== TESTING EXCEL EXPORT FORMULA ACCURACY ===\n");

// Check METRIC_CONFIG is properly configured
if (window.METRIC_CONFIG) {
    console.log("✅ METRIC_CONFIG found with", Object.keys(window.METRIC_CONFIG).length, "metrics");
    
    // Check each metric type
    const metricsInUse = new Set();
    window.useCases?.forEach(uc => {
        const normalizedUC = window.ensureUseCaseHasBenefits(uc);
        normalizedUC.benefits.forEach(b => metricsInUse.add(b.metric));
    });
    
    console.log("\nMetrics in use:");
    metricsInUse.forEach(metric => {
        const config = window.METRIC_CONFIG[metric];
        if (config) {
            console.log(`✅ ${metric}: type=${config.type}, has excelFormula=${!!config.excelFormula}`);
        } else {
            console.log(`❌ ${metric}: NO CONFIG FOUND!`);
        }
    });
    
    // Test FCR special handling
    const fcrConfig = window.METRIC_CONFIG['FCR Improvement (%)'];
    if (fcrConfig && fcrConfig.repeatCallFactor === 0.3) {
        console.log("\n✅ FCR repeat call factor correctly set to 0.3");
    } else {
        console.log("\n❌ FCR repeat call factor missing or incorrect");
    }
    
    // Test calculation consistency
    console.log("\n=== CALCULATION CONSISTENCY TEST ===");
    const testUC = window.useCases?.[0];
    if (testUC && window.months?.length > 0) {
        const monthId = window.months[0].id;
        const jsCalc = window.calculateSavings(testUC, monthId);
        console.log(`JS Calculation for ${testUC.name}: $${jsCalc.toFixed(2)}`);
        
        // Check total
        const total = window.calculateTotalSavings();
        console.log(`Total UI Savings: $${total.toFixed(2)}`);
    }
    
} else {
    console.log("❌ METRIC_CONFIG not found!");
}

console.log("\n✅ To verify Excel export:");
console.log("1. Click 'Export to Excel' button");
console.log("2. Open in Excel");
console.log("3. Check formulas calculate automatically");
console.log("4. Create pivot table and compare total to UI");
