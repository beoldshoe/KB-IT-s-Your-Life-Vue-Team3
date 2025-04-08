<template>
    <div class="p-4">
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
    <div class="total-result">
      {{ (store.totalIncome - store.totalSpend).toLocaleString() }}원
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
                        <div v-for="entry in getBudgetByDay(date.day)" :key="entry.id" class="text-xs">
                            <span :class="['entry-price',entry.type === '지출' ? 'text-spending': 'text-income']">
                                {{ entry.price.toLocaleString() }}원
                            </span>
                        </div>
                    </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
  <script setup>
  import { useHanaStore } from '@/stores/hana';
  
  const props = defineProps({
    year: String,
    month: String,
  });
  
  const store = useHanaStore();
  
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
  //해당 날짜 거래 내역 조회
  const getBudgetByDay = (day) => {
    return store.getBudgetByDate(props.year, props.month, String(day).padStart(2, '0'));
  };

  </script>
  
  <style scoped>
.p-4{
    background-color: #E7F1FE;
}
.calendar-total-data {
  display: flex;
  justify-content: center;
  gap: 250px;
  margin-bottom: 30px;
  text-align: center;
  background-color: white;
}

.total {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 20px;
  margin-bottom: 4px;
}

.text-spending{
    font-size: 15px;
    text-align: center;
    color: #FD583B;
    font-weight: 600;
}
.text-income{
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    color: #48A0E9;
}

.calendar-header{
    width: 100%;
    text-align: center;
}
.calendar-cell{
    width: 14.28%;
    min-height: 100px;
    height: 120px;
    vertical-align: top;
    padding: 4px;
    font-size: 14px;
    text-align: left;
    color: black;
}
.entry-price{
    font-size: 11px;
    display:block;
}
</style>