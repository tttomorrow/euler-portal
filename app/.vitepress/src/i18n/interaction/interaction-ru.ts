import newsdata from './news/news';
import blogdata from './blog/blog';
import meetupsdata from './meetups/meetups';
export default {
  BLOG: 'Блог',
  TAG: 'Tagсито',
  NEWS: 'Новости',
  BROWSE: 'просматривать',
  TIMES: 'раза',
  TIME: 'время',
  AUTHOR: 'автор',
  TAGS: 'метка',
  ALL: 'все',
  PREV: 'Часть первая:',
  DISCLAIMER:
    '[Заявление об отсутствии гарантий] Данная статья представляет только мнения автора и не имеет отношения к данному веб-сайту. Данный веб-сайт является нейтральным с точки зрения заявлений и мнений, содержащихся в данной статье, и отказывается от всех явно выраженных или подразумеваемых гарантий точности, надежности и полноты содержащейся информации. Информация, содержащаяся в данной статье, предназначена только для справки, и все юридические обязательства, вытекающие из нее, несет сам читатель.',
  COPYRIGHT_1:
    '[Заявление об авторском праве]Copyright © 2022 openEuler Community. Данная статья была впервые опубликована сообществом openEuler. Пожалуйста, копируйте и распространяйте ее в соответствии с лицензией',
  COPYRIGHT_2:
    'При перепечатке необходимо указать в тексте исходную ссылку и информацию об авторе.',
  NEXT: 'Часть вторая:',
  STRATEGY: 'Ведение блога',
  NEWSDATALIST: newsdata.ru.NEWSLIST,
  BLOGDATALIST: blogdata.ru.BLOGLIST,
  SCREENDATALIST: blogdata.ru.SCREENBUTTON,
  TAGSDATALIST: blogdata.ru.TAGS,
  MEETUPSLIST: meetupsdata.ru.MEETUPS,
};
