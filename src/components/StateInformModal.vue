<template>
  <!-- Modal -->
  <div
    class="modal fade"
    ref="modal"
    id="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      v-for="(msg, key) in messages"
      :key="key"
      :class="`modal-dialog${key}`"
    >
      <div v-if="success" class="modal-content">
        <div class="modal-header" :class="`bg-${msg.style}`">
          <h3
            class="modal-title text-light font-Noto fw-700"
            id="exampleModalLabel "
          >
            {{ msg.title }}
          </h3>
          <button
            type="button"
            class="btn-close"
            @click="clearToast(key)"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="msg.content" class="modal-body">
          <div class="container pt-2 gx-2">
            <p class="font-Noto fw-400">
              {{ msg.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      messages: [],
    };
  },
  mixins: [modalMixin],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },

  mounted() {
    emitter.on('push-front-message', (message) => {
      const { style = 'warning', title, content } = message;
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>
