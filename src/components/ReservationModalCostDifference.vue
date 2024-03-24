<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  oldCost: number,
  newCost: number
}>()

const difference = computed(() => (props.newCost - props.oldCost).toFixed(2))

</script>
<template>
  <q-field filled bg-color="light-blue-1" readonly prefix="Cost Difference">
    <template v-slot:control>
      <div class="full-width" style="text-align: right;">
        <span style="font-weight: bold;">
          {{ difference }}
        </span>
      </div>
    </template>
    <template v-slot:append>
      <q-avatar>
        <img src="~assets/euro-currency-symbol.svg">
      </q-avatar>
    </template>
  </q-field>
</template>
