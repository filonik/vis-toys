<script setup lang="ts">
const parametricSurfaces = [
    {
        title: "Wave",
        path:'/#/parametric-surface/?state=e3NvdXJjZTonQHBsb3RcbmZuIGYoeDogdmVjMmYpIC0-IHZlYzNmIHtcbiAgcmV0dXJuIHZlYzNmKHhbMF0sIHhbMV0sIHNpbih4WzBdKSpjb3MoeFsxXSkpO1xufScsb3B0aW9uczp7YXJnczpbMCwwLDAsMF0sZnVuY3Rpb25zOlt7Y29sb3I6JyNmZmZmZmYnLGV4dGVudDpbWy0zLjE0MTU5MjY1MzU4OTc5MywtMy4xNDE1OTI2NTM1ODk3OTNdLFszLjE0MTU5MjY1MzU4OTc5MywzLjE0MTU5MjY1MzU4OTc5M11dLHZpc2libGU6dHJ1ZX1dfX0'
    },
    {
        title: "Torus",
        path: "/#/parametric-surface/?state=e3NvdXJjZTonQHBsb3RcbmZuIGYoeDogdmVjMmYpIC0-IHZlYzNmIHtcbiAgbGV0IHIgPSB1R2xvYmFsLmFyZ3MueHk7XG4gIHJldHVybiByWzBdICogdmVjM2YoXG4gICAgY29zKHhbMF0pLFxuICAgIHNpbih4WzBdKSxcbiAgICAwLFxuICApICsgclsxXSAqIHZlYzNmKFxuICAgIGNvcyh4WzFdKSpjb3MoeFswXSksXG4gICAgY29zKHhbMV0pKnNpbih4WzBdKSxcbiAgICBzaW4oeFsxXSksXG4gICk7XG59JyxvcHRpb25zOnthcmdzOlsxLDAuNSwwLDBdLGZ1bmN0aW9uczpbe2NvbG9yOicjZmZmZmZmJyxleHRlbnQ6W1stMy4xNDE1OTI2NTM1ODk3OTMsLTMuMTQxNTkyNjUzNTg5NzkzXSxbMy4xNDE1OTI2NTM1ODk3OTMsMy4xNDE1OTI2NTM1ODk3OTNdXSx2aXNpYmxlOnRydWV9XX19",
    },
    {
        title: "Dual Clifford 3",
        path: '/#/parametric-surface/?state=e3NvdXJjZTonZm4gZGNsM19yb3RvcihrOiBmMzIsIHg6IHZlYzJmKSAtPiBkY2wzcm90IHtcbiAgbGV0IHIwMSA9IGRjbDNyb3RfZXhwKGssIGRjbDNyb3RfbXVscyhkY2wzcm90X2UxMiwgMC41KnhbMF0pKTtcbiAgbGV0IHIxMiA9IGRjbDNyb3RfZXhwKGssIGRjbDNyb3RfbXVscyhkY2wzcm90X2UwMSwgMC41KnhbMV0pKTtcbiAgcmV0dXJuIGRjbDNyb3RfbXVsKGssIHIwMSwgcjEyKTtcbn1cblxuZm4gZGNsM19uY29vcmQoazogZjMyLCB4OiB2ZWMyZikgLT4gZGNsM3JvdCB7XG4gIGxldCByID0gZGNsM19yb3RvcihrLCB4KTtcbiAgcmV0dXJuIGRjbDNyb3Rfc3coaywgZGNsM3JvdF9lMDEsIHIpO1xufVxuXG5jb25zdCBBID0gdmVjMmYoMS4sIDAuKlRBVS8zLik7XG5jb25zdCBCID0gdmVjMmYoMS4sIDEuKlRBVS8zLik7XG5jb25zdCBDID0gdmVjMmYoMS4sIDIuKlRBVS8zLik7XG5cbkBwbG90XG5mbiBmKHg6IHZlYzJmKSAtPiB2ZWMzZiB7XG4gIGxldCBrID0gdUdsb2JhbC5hcmdzWzBdO1xuICByZXR1cm4gZGNsM19uY29vcmQoaywgeCkueHl6O1xufVxuXG5AcGxvdFxuZm4gbEFCKHQ6IHZlYzFmKSAtPiB2ZWMzZiB7XG4gIGxldCBrID0gdUdsb2JhbC5hcmdzWzBdO1xuICBsZXQgYSA9IGRjbDNfbmNvb3JkKGssIEEpO1xuICBsZXQgYiA9IGRjbDNfbmNvb3JkKGssIEIpO1xuICBsZXQgdmlldyA9IGRjbDNfcm90b3IoaywgdUdsb2JhbC5hcmdzLnl6KTtcbiAgcmV0dXJuIGRjbDNyb3Rfc3coaywgZGNsM3JvdF9taXgoaywgYSwgYiwgdCksIHZpZXcpLnh5ejtcbn1cblxuQHBsb3RcbmZuIGxCQyh0OiB2ZWMxZikgLT4gdmVjM2Yge1xuICBsZXQgayA9IHVHbG9iYWwuYXJnc1swXTtcbiAgbGV0IGIgPSBkY2wzX25jb29yZChrLCBCKTtcbiAgbGV0IGMgPSBkY2wzX25jb29yZChrLCBDKTtcbiAgbGV0IHZpZXcgPSBkY2wzX3JvdG9yKGssIHVHbG9iYWwuYXJncy55eik7XG4gIHJldHVybiBkY2wzcm90X3N3KGssIGRjbDNyb3RfbWl4KGssIGIsIGMsIHQpLCB2aWV3KS54eXo7XG59XG5cbkBwbG90XG5mbiBsQ0EodDogdmVjMWYpIC0-IHZlYzNmIHtcbiAgbGV0IGsgPSB1R2xvYmFsLmFyZ3NbMF07XG4gIGxldCBjID0gZGNsM19uY29vcmQoaywgQyk7XG4gIGxldCBhID0gZGNsM19uY29vcmQoaywgQSk7XG4gIGxldCB2aWV3ID0gZGNsM19yb3RvcihrLCB1R2xvYmFsLmFyZ3MueXopO1xuICByZXR1cm4gZGNsM3JvdF9zdyhrLCBkY2wzcm90X21peChrLCBjLCBhLCB0KSwgdmlldykueHl6O1xufVxuJyxvcHRpb25zOnthcmdzOlsxLDAsMCwwXSxmdW5jdGlvbnM6W3tjb2xvcjonIzU1NTU1NScsZXh0ZW50OltbMCwtMy4xNDE1OTI2NTM1ODk3OTNdLFszLjE0MTU5MjY1MzU4OTc5MywzLjE0MTU5MjY1MzU4OTc5M11dLHZpc2libGU6dHJ1ZX0se2NvbG9yOicjZmZmZmZmJyxleHRlbnQ6W1swXSxbMV1dLHZpc2libGU6dHJ1ZX0se2NvbG9yOicjZmZmZmZmJyxleHRlbnQ6W1swXSxbMV1dLHZpc2libGU6dHJ1ZX0se2NvbG9yOicjZmZmZmZmJyxleHRlbnQ6W1swXSxbMV1dLHZpc2libGU6dHJ1ZX1dfX0'
    }

]

const implicitSurfaces = [
    {
        title: "Wave",
        path:'/#/implicit-surface/?state=e3NvdXJjZTonQHBsb3RfaW1wbGljaXRcbmQyZTMgZihpbiBkMmUzdmVjMyB4KSB7XG4gIHJldHVybiBzaW4oeFswXSkgKyBjb3MoeFsxXSkgKyB4WzJdO1xufSd9'
    },
    {
        title: "Torus",
        path: '/#/implicit-surface/?state=e3NvdXJjZTonQHBsb3RfaW1wbGljaXRcbmQyZTMgZihpbiBkMmUzdmVjMyB4KSB7XG4gIGZsb2F0IFIgPSAyLjtcbiAgZmxvYXQgciA9IDEuO1xuICBkMmUzIGxocyA9IHhbMF0qeFswXSArIHhbMV0qeFsxXSArIHhbMl0qeFsyXSArIFIqUiAtICByKnI7XG4gIGQyZTMgcmhzID0gNC4qUipSICogKHhbMF0qeFswXSArIHhbMV0qIHhbMV0pO1xuICByZXR1cm4gbGhzKmxocyAtIHJocztcbn0nfQ'
    },
    {
        title: "Clebsch Cubic",
        path:'/#/implicit-surface/?state=e3NvdXJjZTonQHBsb3RfaW1wbGljaXRcbmQyZTMgZihpbiBkMmUzdmVjMyB4KSB7XG4gIHJldHVybiA4MS4qKHhbMF0qeFswXSp4WzBdICsgeFsxXSp4WzFdKnhbMV0gKyB4WzJdKnhbMl0qeFsyXSlcbiAgICAtIDE4OS4qKHhbMF0qeFswXSp4WzFdICsgeFswXSp4WzBdKnhbMl0gKyB4WzFdKnhbMV0qeFswXSArICB4WzFdKnhbMV0qeFsyXSArIHhbMl0qeFsyXSp4WzBdICsgIHhbMl0qeFsyXSp4WzFdKVxuICAgICsgNTQuKih4WzBdKnhbMV0qeFsyXSlcbiAgICArIDEyNi4qKHhbMF0qeFsxXSArIHhbMF0qeFsyXSArIHhbMV0qeFsyXSlcbiAgICAtIDkuKih4WzBdKnhbMF0gKyB4WzFdKnhbMV0gKyB4WzJdKnhbMl0pXG4gICAgLSA5LiooeFswXSArIHhbMV0gKyB4WzJdKVxuICAgICsgMS47XG59J30'
    },
    {
        title: "Tooth",
        path: '/#/implicit-surface/?state=e3NvdXJjZTonQHBsb3RfaW1wbGljaXRcbmQyZTMgZihpbiBkMmUzdmVjMyB4KSB7XG4gIGQyZTN2ZWMzIHh4ID0gZDJlM3ZlYzMoXG4gICAgeFswXSp4WzBdLFxuICAgIHhbMV0qeFsxXSxcbiAgICB4WzJdKnhbMl1cbiAgKTtcbiAgcmV0dXJuIHh4WzBdKnh4WzBdICsgeHhbMV0qeHhbMV0gKyB4eFsyXSp4eFsyXSAtICh4eFswXSt4eFsxXSt4eFsyXSk7XG59J30'
    },
    {
        title: "Ding-Dong",
        path: '/#/implicit-surface/?state=e3NvdXJjZTonQHBsb3RfaW1wbGljaXRcbmQyZTMgZihpbiBkMmUzdmVjMyB4KSB7XG4gIHJldHVybiB4WzBdKnhbMF0gKyB4WzFdKnhbMV0gLSAoMS4gLSB4WzJdKSp4WzJdKnhbMl07XG59J30',
    },
    {
        title: "Unknown",
        path: '/#/implicit-surface/?state=e3NvdXJjZTonQHBsb3RfaW1wbGljaXRcbmQyZTMgZihpbiBkMmUzdmVjMyB4KSB7XG4gIGZsb2F0IGMyID0gMi47XG4gIGQyZTMgZjEgPSBwb3coeFswXSAtIGMyLCAyLikqcG93KHhbMF0gKyBjMiwgMi4pO1xuICBkMmUzIGYyID0gcG93KHhbMV0gLSBjMiwgMi4pKnBvdyh4WzFdICsgYzIsIDIuKTtcbiAgZDJlMyBmMyA9IHBvdyh4WzJdIC0gYzIsIDIuKSpwb3coeFsyXSArIGMyLCAyLik7XG4gIFxuICBkMmUzIGY0ID0gMy4qKHhbMF0qeFswXSp4WzFdKnhbMV0gKyB4WzBdKnhbMF0qeFsyXSp4WzJdICsgeFsxXSp4WzFdKnhbMl0qeFsyXSk7XG5cbiAgZDJlMyBmNSA9IDYuKih4WzBdKnhbMV0qeFsyXSk7XG4gIGQyZTMgZjYgPSAtMTAuKih4WzBdKnhbMF0gKyB4WzFdKnhbMV0gKyB4WzJdKnhbMl0pO1xuXG4gIHJldHVybiBmMSArIGYyICsgZjMgKyBmNCArIGY1ICsgZjYgKyAyMi47XG59XG4nfQ'
    }
]

</script>

<template>
  <main class="h-full flex flex-col justify-center items-center">
    <section class="flex flex-col w-80 my-4">
        <h2>Parametric Surfaces</h2>
        <ul>
            <li v-for="link, i in parametricSurfaces" :key="i">
                <a :href="link.path">{{link.title}}</a>
            </li>
        </ul>
    </section>
    <section class="flex flex-col w-80 my-4">
        <h2>Implicit Surfaces</h2>
        <ul>
            <li v-for="link, i in implicitSurfaces" :key="i">
                <a :href="link.path">{{link.title}}</a>
            </li>
        </ul>
    </section>
  </main>
</template>

<style scoped>
</style>
