var app1 = new Vue({
    el: '#app',
    data: {
        final_actual_collar: 20000, // 最終實領(支領淨額)
        quotation: 0, // 報價(支領金額)
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
        // 報價(支領金額)=最終實領(支領淨額)+健保費+所得稅
        getTaxIncludedQuotation: function () {
            this.quotation = Math.floor(parseInt(this.final_actual_collar)/(1 - this.health_insurance_rate - this.income_tax_rate));
            return this.quotation;
        }
    }
})

var app2 = new Vue({
    el: '#app2',
    data: {
        final_actual_collar: 0, // 最終實領(支領淨額)
        quotation: 20000, // 報價(支領金額)
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
                this.health_insurance = Math.floor(this.quotation * this.health_insurance_rate);
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
                this.income_tax = Math.floor(this.quotation * this.income_tax_rate);
            } else {
                this.income_tax_rate = 0;
                this.income_tax = 0;
            }

            return this.income_tax;
        },
        getFinalActualCollar: function () {
            this.final_actual_collar = this.quotation - this.health_insurance - this.income_tax;
            return this.final_actual_collar;
        }
    }
  })