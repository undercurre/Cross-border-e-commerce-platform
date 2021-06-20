<script>
export default {
  functional: true,
  render: function (createElement, context) {
    console.log(context)
    return createElement('div', {
      attrs: {
        class: 'render_tab'
      }
    }, context.props.tab.map(function (item) {
      return createElement(item.type, {
        attrs: {
          placeholder: item.text
        }
      }, item.text)
    }))
  },
  props: {
    tab: {
      type: Array
    }
  }
}
</script>
