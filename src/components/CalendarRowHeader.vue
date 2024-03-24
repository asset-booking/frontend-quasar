<script setup lang="ts">
import { Asset } from 'src/app.asset/asset.model'

const props = defineProps<{
  asset: Asset
}>()

const topSpecsBorder = {
  borderTop: props.asset.specification || props.asset.specificationIcons ? '1px solid grey' : '1px'
}

const topNotesBorder = {
  borderTop: props.asset.note ? '1px solid grey' : '1px'
}
</script>

<template>
  <td class="header-column">
    <table>
      <tr>
        <div>
          <span>{{ asset.categoryReference }}</span>
          <q-tooltip>{{ asset.categoryReference }}</q-tooltip>
        </div>
      </tr>
      <tr>
        <div :style="topSpecsBorder">
          <template v-if="asset.specificationIcons">
            <q-icon v-for="specIcon in asset.specificationIcons" :key="specIcon" :name="specIcon" size="2em" />
          </template>
          <span>{{ asset.specification }}</span>
          <q-tooltip v-if="asset.specification">{{ asset.specification }}</q-tooltip>
        </div>
      </tr>
      <tr>
        <div :style="topNotesBorder">
          <template v-if="asset.noteIcons">
            <q-icon v-for="noteIcon in asset.noteIcons" :key="noteIcon" :name="noteIcon" size="1.5em" />
          </template>
          <span>{{ asset.note }}</span>
          <q-tooltip v-if="asset.note">{{ asset.note }}</q-tooltip>
        </div>
      </tr>
    </table>
  </td>
</template>
