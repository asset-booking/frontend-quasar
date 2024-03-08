<script setup lang="ts">
import { Asset } from 'src/app.asset/asset.model'

const props = defineProps<{
  asset: Asset
}>()

const topSpecsBorder = {
  borderTop: props.asset.specs || props.asset.specsIcons ? '1px solid grey' : '1px'
}

const topNotesBorder = {
  borderTop: props.asset.specs || props.asset.notesIcons ? '1px solid grey' : '1px'
}
</script>

<template>
  <td class="header-column">
    <table>
      <tr>
        <div>
          <span>{{ asset.addressRef }}</span>
          <q-tooltip>{{ asset.addressRef }}</q-tooltip>
        </div>
      </tr>
      <tr>
        <div :style="topSpecsBorder">
          <q-icon v-if="asset.specsIcons" :name="asset.specsIcons" size="2em" />
          <span>{{ asset.specs }}</span>
          <q-tooltip v-if="asset.specs">{{ asset.specs }}</q-tooltip>
        </div>
      </tr>
      <tr>
        <div :style="topNotesBorder">
          <span>{{ asset.notes }}</span>
          <q-tooltip v-if="asset.specs">{{ asset.notes }}</q-tooltip>
        </div>
      </tr>
    </table>
  </td>
</template>
