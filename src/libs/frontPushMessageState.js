import eventBus from '@/libs/emitter';

export default function $fontHttpMessageState(response, title = '更新') {
  if (response.data.success) {
    eventBus.emit('push-front-message', {
      style: 'warning',
      title: `${title}成功`,
    });
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    // eslint-disable-next-line operator-linebreak
    const message =
      typeof response.data.message === 'string'
        ? [response.data.message]
        : response.data.message;
    eventBus.emit('push-front-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
}
