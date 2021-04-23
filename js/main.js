var app1 = new Vue({
    el: '#app',
    data: {
        final_actual_collar: 20000, // 最終實領(支領淨額)
        tax_included_quotation: 0, // 含稅報價(支領金額)
        tax_exclude_quotation: 0, // 不含稅報價(支領金額) 
        health_toggle: true, // 是否勾選健保費
        health_insurance_rate: 0.0211, // 健保費率 2021 2.11%
        health_insurance: 0, // 健保費
        income_tax_toggle: true,
        income_tax_rate: 0.1, // 所得稅率(低於兩萬不扣)
        income_tax: 0, // 所得稅
    },
    computed: {
        // 健保費
        getHealthInsurance: function () {
            if (this.health_toggle) {
                this.health_insurance_rate = 0.0211;
                this.health_insurance = Math.floor((this.health_insurance_rate * this.final_actual_collar)/(1 - this.health_insurance_rate - this.income_tax_rate));
            } else {
                this.health_insurance_rate = 0;
                this.health_insurance = 0;
            }
            
            return this.health_insurance;
        },
        // 所得稅
        getIncomeTax: function () {
            if (this.income_tax_toggle && this.final_actual_collar > 20000) {
                this.income_tax_rate = 0.1;
                this.income_tax = Math.floor((this.income_tax_rate * this.final_actual_collar)/(1 - this.health_insurance_rate - this.income_tax_rate));
            } else {
                this.income_tax_rate = 0;
                this.income_tax = 0;
            }

            return this.income_tax;
        },
        // 含稅報價(支領金額)=最終實領(支領淨額)+健保費+所得稅
        getTaxIncludedQuotation: function () {
            this.tax_included_quotation = Math.floor(parseInt(this.final_actual_collar)/(1 - this.health_insurance_rate - this.income_tax_rate));
            console.log("getTaxIncludedQuotation");
            return this.tax_included_quotation;
        },
        // 不含稅報價(支領金額)=最終實領(支領淨額)
        getTaxExcludeQuotation: function () {
            this.tax_exclude_quotation = this.final_actual_collar;
            return this.tax_exclude_quotation;
        },
        // 最終實領(支領淨額)=含稅報價(支領金額)-健保費-所得稅
        getFinalActualCollar: function () {
            this.final_actual_collar = this.tax_included_quotation - this.health_insurance - this.income_tax;
            console.log("getFinalActualCollar");
            return this.final_actual_collar;
        }
    }
})

var app2 = new Vue({
    el: '#app2',
    data: {
        final_actual_collar: 0, // 最終實領(支領淨額)
        tax_included_quotation: 20000, // 含稅報價(支領金額)
        tax_exclude_quotation: 0, // 不含稅報價(支領金額) 
        health_toggle: true, // 是否勾選健保費
        health_insurance_rate: 0.0211, // 健保費率 2021 2.11%
        health_insurance: 0, // 健保費
        income_tax_toggle: true,
        income_tax_rate: 0.1, // 所得稅率(低於兩萬不扣)
        income_tax: 0, // 所得稅
    },
    computed: {
        // 健保費
        getHealthInsurance: function () {
            if (this.health_toggle) {
                this.health_insurance_rate = 0.0211;
                this.health_insurance = Math.floor((this.health_insurance_rate * this.final_actual_collar)/(1 - this.health_insurance_rate - this.income_tax_rate));
            } else {
                this.health_insurance_rate = 0;
                this.health_insurance = 0;
            }
            
            return this.health_insurance;
        },
        // 所得稅
        getIncomeTax: function () {
            if (this.income_tax_toggle && this.final_actual_collar > 20000) {
                this.income_tax_rate = 0.1;
                this.income_tax = Math.floor((this.income_tax_rate * this.final_actual_collar)/(1 - this.health_insurance_rate - this.income_tax_rate));
            } else {
                this.income_tax_rate = 0;
                this.income_tax = 0;
            }

            return this.income_tax;
        },
        // 含稅報價(支領金額)=最終實領(支領淨額)+健保費+所得稅
        getTaxIncludedQuotation: function () {
            this.tax_included_quotation = Math.floor(parseInt(this.final_actual_collar)/(1 - this.health_insurance_rate - this.income_tax_rate));
            console.log("getTaxIncludedQuotation");
            return this.tax_included_quotation;
        },
        // 不含稅報價(支領金額)=最終實領(支領淨額)
        getTaxExcludeQuotation: function () {
            this.tax_exclude_quotation = this.final_actual_collar;
            return this.tax_exclude_quotation;
        },
        // 最終實領(支領淨額)=含稅報價(支領金額)-健保費-所得稅
        getFinalActualCollar: function () {
            this.final_actual_collar = this.tax_included_quotation - this.health_insurance - this.income_tax;
            console.log("getFinalActualCollar");
            return this.final_actual_collar;
        }
    }
  })