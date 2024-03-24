<script setup lang="ts">
import { AssetOption } from 'src/app.asset/asset.model'
import { assetService } from 'src/app.asset/asset.service'
import { onMounted, ref, watchEffect } from 'vue'

const props = defineProps<{
  selectedAssetId?: number,
  disableAll?: boolean
}>()

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'assetSelected', assetIds: number[]): void
}>()

const availableAssets = ref<AssetOption[]>([])
const filteredAssets = ref<AssetOption[]>(availableAssets.value)
const selectedAssets = ref<AssetOption[]>([])

/* eslint-disable @typescript-eslint/no-explicit-any */
const filterAssets = (val: string, update: any) => {
  update(() => {
    if (val === '') {
      filteredAssets.value = availableAssets.value
    } else {
      const needle = val.toLowerCase()
      filteredAssets.value = availableAssets.value.filter(
        a => a.categoryReferenceWithSpec.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

onMounted(async () => {
  const assets = await assetService.getAll()
  assets.forEach(asset => {
    availableAssets.value.push({
      id: asset.id,
      categoryReferenceWithSpec: asset.categoryReference + ` - ${asset.specification}`,
      disabled: props.disableAll
    })
  })

  if (props.selectedAssetId) {
    const selectedAsset = availableAssets.value.find(a => a.id === props.selectedAssetId)
    if (selectedAsset) {
      selectedAsset.disabled = true
      selectedAssets.value.push(selectedAsset)
    }
  }
})

watchEffect(() => {
  emits('assetSelected', selectedAssets.value.map(sa => sa.id))
})
</script>

<template>
  <q-select class="q-mb-lg"
    hide-bottom-space
    options-dense
    @filter="filterAssets"
    use-input
    input-debounce="200"
    counter
    hint="Selected assets"
    hide-selected
    filled
    v-model="selectedAssets"
    :options="filteredAssets"
    option-disable="disabled"
    label="Assets"
    multiple>
    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
      <q-item v-bind="itemProps">
        <q-item-section>
          <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" :label="opt.categoryReferenceWithSpec" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
