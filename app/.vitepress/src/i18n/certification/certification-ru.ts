import hcia from '@/assets/category/certification/hcia.png';
import hcie from '@/assets/category/certification/hcie.png';
import hcip from '@/assets/category/certification/hcip.png';
export default {
  title: 'сертификаты openEuler-HCIX',
  detail:
    'openEuler-HCIA, openEuler-HCIP и openEuler-HCIE являются сертификатами, доказывающими возможности различных уровней, признанными сообществом openEuler. Если вы заинтересованы в получении сертификата, щелкните по следующим пунктам, чтобы зарегистрироваться для прохождения обучения и сертификационного экзамена.',
  download: 'Загрузить сертификаты',
  cardList: [
    {
      ill: hcia,
      name: 'openEuler-HCIA',
      professional: 'Сертифицированный инженер',
      more: 'больш',
      link: 'https://e.huawei.com/en/talent/#/cert/product-details?certifiedProductId=383&amp%3BauthenticationLevel=CTYPE_CARE_HCIA&amp%3BtechnicalField=PSC&amp%3Bversion=1.0',
    },
    {
      ill: hcip,
      name: 'openEuler-HCIP',
      professional: 'Сертифицированный старший инженер',
      more: 'Скоро',
      link: '',
    },
    {
      ill: hcie,
      name: 'openEuler-HCIE',
      professional: 'Сертифицированный эксперт',
      more: 'Скоро',
      link: '',
    },
  ],
  verificationQuery: 'Запросить сертификаты',
  certificateDownload: 'Загрузить сертификаты',
  certificateDownload2: 'Загрузить выбранные сертификаты',
  email: 'почтовый',
  placeholderEmail: 'Ваш адрес электронной почты',
  tipEmail:
    'Введите адрес электронной почты, используемый при проведении сертификационного экзамена, для получения проверочного кода и запроса сертификата.',
  emailErrorTip: 'Неверный адрес электронной почты.！',
  verificationCode: 'код',
  placeholderCode: 'Введите проверочный код.',
  buttonCode: 'Отправить проверочный код',
  sure: 'Подтвердить',
};
