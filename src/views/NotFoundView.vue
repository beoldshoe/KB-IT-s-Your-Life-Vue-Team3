<template>
  <div class="notfound-container">
    <h1 class="title">404 - 페이지를 찾을 수 없습니다</h1>
    <p class="message">요청하신 페이지로 이동할 수 없습니다..</p>
    <router-link to="/" class="home-link">🏠 홈으로 돌아가기</router-link>
  </div>
</template>

<style scoped>
.notfound-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 1rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #e57373;
  margin-bottom: 1rem;
}

.message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.home-link {
  font-size: 1rem;
  color: white;
  background-color: #2d539e;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.3s;
}

.home-link:hover {
  background-color: #1e3e7a;
}
</style>
