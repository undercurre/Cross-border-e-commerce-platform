import util from '@/libs/util.js'
import { menuHeader } from '@/menu/index'

export default {
  methods: {
    handleMenuSelect (index, indexPath) {
      if (/^d2-menu-empty-\d+$/.test(index) || index === undefined) {
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        util.open(index)
      } else {
        this.$router.push({
          path: index
        })
        this.$store.commit('d2admin/menu/asideSet', menuHeader.filter(item => item.path === indexPath[0]))
      }
    }
  }
}
