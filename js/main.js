var vm = new Vue({
    el: '#app',
    data: {
        final_actual_collar: 20000, // 最終實領(支領淨額)
        tax_included_quotation: 0, // 含稅報價(支領金額)
        tax_exclude_quotation: 0, // 不含稅報價(支領金額) 
        toggle: true, // 是否勾選健保費
        health_insurance_rate: 0.0211, // 健保費率 2021 2.11%
        health_insurance: 0, // 健保費
        income_tax_rate: 0.1, // 所得稅率(低於兩萬不扣)
        income_tax: 0, // 所得稅
    },
    // 自定義方法
    methods: {
 
    },
    computed: {
        /*
            支領金額 X
            代扣所得稅(10%) 0.1
            健保補充保費(2.11%) 0.0211
            含稅價 0.689X

            支領金額 -健保 -所得 = 含稅價
            X - 0.1X - 0.0211X = 0.689X

            倒推公式
            支領金額 -健保 -所得 = 含稅價
            X/0.689 - 0.1X/0.689 - 0.0211X/0.689 = X
        */

        // 健保費
        getHealthInsurance: function () {
            if (this.toggle) {
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
            if (this.final_actual_collar > 20000) {
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
            return Math.floor(parseInt(this.final_actual_collar)/(1 - this.health_insurance_rate - this.income_tax_rate));
        },
        // 不含稅報價(支領金額)=最終實領(支領淨額)
        getTaxExcludeQuotation: function () {
            return this.final_actual_collar;
        }
    }
  })