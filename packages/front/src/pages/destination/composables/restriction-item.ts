export const sharedProps = {
  props: {
    restriction: {
      type: Object,
      required: true,
    },
    context: {
      type: [String, Boolean, Array],
      required: false,
    },
    wrapper: {
      type: Object,
      required: true,
    },
  },
}
