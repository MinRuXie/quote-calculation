var vm = new Vue({
    el: '#app',
    data: {
        final_actual_collar: 20000, // 最終實領(支領淨額)
        tax_included_quotation: 0, // 含稅報價(支領金額)
        tax_exclude_quotation: 0, // 不含稅報價(支領金額) 
        toggle: true, // 是否勾選健保費
        health_insurance_rate: 0.0191, // 健保費率
        health_insurance: 0, // 健保費
        income_tax_rate: 0.1, // 所得稅率(低於兩萬不扣)
        income_tax: 0 // 所得稅
    },
    // 自定義方法
    methods: {
        
    },
    computed: {
        // 健保費
        getHealthInsurance: function () {
            this.health_insurance = this.toggle ? Math.floor(this.final_actual_collar * this.health_insurance_rate) : 0;
            return this.health_insurance;
        },
        // 所得稅
        getIncomeTax: function () {
            this.income_tax = this.final_actual_collar >= 20000 ? Math.floor(this.final_actual_collar * this.income_tax_rate) : 0;
            return this.income_tax;
        },
        // 含稅報價(支領金額)=最終實領(支領淨額)+健保費+所得稅
        getTaxIncludedQuotation: function () {
            return parseInt(this.final_actual_collar) + this.health_insurance + this.income_tax;
        },
        // 不含稅報價(支領金額)=最終實領(支領淨額)
        getTaxExcludeQuotation: function () {
            return this.final_actual_collar;
        },
    }
  })