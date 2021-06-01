export const sharedProps = {
  props: {
    restriction: {
      type: Object,
      required: true,
    },
    context: {
      type: [String, Boolean, Array, Object],
      required: false,
    },
    wrapper: {
      type: Object,
      required: true,
    },
  },
}
