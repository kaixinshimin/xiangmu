<template>
  <div>
    <el-table
      :data="
        list.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.sort.includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Id" prop="_id" width="200" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Sort" prop="sort" />
      <el-table-column label="Price" prop="price" />
      <el-table-column label="Number" prop="number" />
      <el-table-column label="Src">
        <template #default="scope">
          <img :src="scope.row.src" class="img" />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { GetProductList, deleteProduct } from '@/api/product'
import { onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'productList',
  setup() {
    onBeforeMount(() => {
      getdata()
    })
    const router = useRouter()
    const list = ref([])
    const search = ref('')
    const getdata = async () => {
      const { msg } = await GetProductList()
      list.value = msg
    }
    const handleEdit = row => {
      router.push(`/product/change/${row._id}`)
    }
    const handleDelete = async row => {
      const { code } = await deleteProduct({
        id: row._id,
      })
      if (code === 1) {
        getdata()
      }
    }
    return { list, search, handleEdit, handleDelete }
  },
}
</script>
<style lang="less" scoped>
.img {
  width: 100px;
  height: 100px;
}
</style>
