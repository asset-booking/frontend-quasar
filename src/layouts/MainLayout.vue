<script setup lang="ts">
import { ref } from 'vue'
import { MenuItem } from './models'

const menuItems = [
  {
    id: 1,
    text: 'menu item 1'
  },
  {
    id: 2,
    text: 'menu item 2'
  },
  {
    id: 3,
    text: 'menu item 3'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const alertItem = (item: MenuItem) => alert(`${item.id} - ${item.text}`)
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Assets Booking
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Left menu placeholder
        </q-item-label>

        <div>
          <ul>
            <li v-for="item in menuItems" :key="item.id" @click="alertItem(item)">
              {{ item.text }}
            </li>
          </ul>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
