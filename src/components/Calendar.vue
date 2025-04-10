<template>
    <div class="calendar-wrapper">
      <div class="calendar-container">
        <div class="calendar-total-data">
  <div class="total">
    <div class="label">수입</div>
    <div class="text-income">{{ store.totalIncome.toLocaleString() }}원</div>
  </div>
  <div class="total">
    <div class="label">지출</div>
    <div class=" text-spending">{{ store.totalSpend.toLocaleString() }}원</div>
  </div>
  <div class="total">
    <div class="label">합계</div>
    <div
    class="total-result"
    :class="(store.totalIncome - store.totalSpend) >= 0 ? 'text-income' : 'text-spending'"
  >
      {{ (store.totalIncome - store.totalSpend).toLocaleString() }}원
    </div>
  </div>
</div>
</div>
        <table class="calendar-header">
            <tbody >
                <tr v-for="(week, weekIdx) in calendarRows" :key="weekIdx">
                    <td
                    v-for="date in week"
                    :key="date ? 'day-' + date.day : 'blank'"
                    class="calendar-cell">
        
                    <div v-if="date">
                        {{ date.day }}
                        <div class="entry-group">
                          <div v-if="getBudgetSumByDay(date.day).spend > 0">
                            <span class="entry-price text-spending">
                                {{ getBudgetSumByDay(date.day).spend.toLocaleString() }}
                            </span>
                          </div>
                          <div v-if="getBudgetSumByDay(date.day).income > 0">
                            <span class="entry-price text-income">
                              {{ getBudgetSumByDay(date.day).income.toLocaleString() }}
                            </span>
                          </div>
                      </div>
                    </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
  <script setup>
 import { useFinancialStore } from '@/stores/financial';
  
  const props = defineProps({
    year: String,
    month: String,
  });
  
  const store = useFinancialStore();
  
const daysInMonth = new Date(props.year, parseInt(props.month), 0).getDate();
const firstDay = new Date(props.year, parseInt(props.month) - 1, 1).getDay();
  
  //날짜 배열
  const calendarRows = [];
  let currentWeek = Array(firstDay).fill(null); //앞 빈칸 채우기
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push({ day });
      if (currentWeek.length === 7) {
       calendarRows.push(currentWeek);
       currentWeek = [];
    }
}
if (currentWeek.length) {
  while (currentWeek.length < 7) currentWeek.push(null); // 마지막 주 빈칸
  calendarRows.push(currentWeek);
}
  //해당 날짜/카테고리 거래 내역 조회
  const getBudgetByDay = (day) => {
  const list = store.getBudgetByDate(props.year, props.month, String(day).padStart(2, '0'));
  let resultList;

  if (store.selectedCategory) {
    resultList = list.filter((item) => item.category === store.selectedCategory);
  } else {
    resultList = list;
  }
  return resultList;
};

  const getBudgetSumByDay = (day) => {
    const dayEntry = getBudgetByDay(day);
    let income = 0;
    let spend = 0;

    dayEntry.forEach((entry)=> {
      if(entry.type === '수입'){
        income += entry.price;
      }else if (entry.type === '지출'){
        spend += entry.price;
      }
    });
    return {
      income,
      spend,
    }
  }
  </script>
  
  <style scoped>
.calendar-wrapper{
  padding: 0; 
  margin: 0;
  background-color: #E7F1FE;
  margin-top: 50px; 
}
.calendar-container {
  padding-top: 80px; 
}
.calendar-total-data {
  display: flex;
  justify-content: center;
  gap: 250px;
  margin-bottom: 50px;
  text-align: center;
  background-color: white;
}

.total {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  padding: 0;
}

.label {
  font-size: 20px;
  margin-bottom: 4px;
}

.text-spending{
    font-size: 18px;
    text-align: center;
    color: #FD583B;
    font-weight: 600;
}
.text-income{
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #48A0E9;
}

.calendar-header{
    border-collapse: separate;
    border-spacing: 35px 10px;    
    width: 100%;
    text-align: center;
}
.calendar-cell {
  border-top: 5px solid white;
  width: 14.28%;
  min-height: 100px;
  height: 100px;
  vertical-align: top;
  padding: 4px;
  font-size: 14px;
  text-align: left;
  background-color: #E7F1FE;
  color: black;
  overflow: hidden;
  
}

.entry-group {
  margin-top: 40px; 
  height: 40px; 
}

.entry-price{
    font-size: 15px;
    display:block;
}
</style>