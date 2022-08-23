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
  NEXT: 'Часть вторая:',
  STRATEGY: 'Ведение блога',
  NEWSDATALIST: newsdata.ru.NEWSLIST,
  BLOGDATALIST: blogdata.ru.BLOGLIST,
  SCREENDATALIST: blogdata.ru.SCREENBUTTON,
  TAGSDATALIST: blogdata.ru.TAGS,
  MEETUPSLIST: meetupsdata.ru.MEETUPS,
};
