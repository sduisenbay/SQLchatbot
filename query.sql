-- First create a table with required column names, types
CREATE TABLE QAnew (
  questionID int PRIMARY KEY NOT NULL,
  category NVARCHAR(255) NOT NULL,
  question NVARCHAR(255) NULL,
  answer NTEXT NULL
)

GO
-- QuestionID parameter increases incrementally (1,2,3,4)
-- Rows with the same categories should always be placed together
-- Each category should finish with 'Главное меню' as last question
-- "Выйти" should always be at the end
For each category, 'Главное меню' question should be added as below
INSERT INTO QAnew (questionID,category,question,answer)
VALUES(1,'Оборудование','Заказ оборудования','Для заказа аксессуаров для мобильного устройства и картриджей для принтеров:'+ CHAR(13)+CHAR(10)+
                  'Пройдите на сайт онлайн магазина [комус](http://www.komus.ru). Для более подробной '+
                  'информации взгляните на стр.36-37 [IT Handbook](https://ge.ent.box.com/s/xeiaqophfyqfd9r55wn7axeog6kml26y)'+CHAR(13)+CHAR(10)+CHAR(13)+CHAR(10)+
                  'Для заказа прочего оборудования:'+CHAR(13)+CHAR(10)+
                  'Пройдите по [этой ссылке](http://sc.ge.com/*corpreq). Для более подробной'+
                  ' информации взгляните на стр.36-37 [IT Handbook](https://ge.ent.box.com/s/xeiaqophfyqfd9r55wn7axeog6kml26y)'),
       (2,'Оборудование','Утеря оборудования','Незамедлительно пройдите на сайт [GE Security](http://security.ge.com) - REPORTING - LOST OR STOLEN DEVICES и заполните запрос'),
       (3,'Оборудование','Срок замены ноутбука','Пройдите на  [сайт MyTech](http://mytech.ge.com) - Products & Services - View Assets'),
       (4,'Оборудование','Главное меню',NULL),
       (5,'Работа с данными и доступ к ним','Резервная копия данных','Установите Box Sync и автоматически синхронизируйте файлы с Box. Для более подробной инструкции взгляните на стр.33 [IT Handbook](https://ge.ent.box.com/s/xeiaqophfyqfd9r55wn7axeog6kml26y)'),
       (6,'Работа с данными и доступ к ним','Доступ к сетевым папкам','Пройдите на [портал по инф.безопасности]( http://sl.ge/*rucis_infosecurity) - Процедуры и инструкции - Работа с сетевыми папками'),
       (7,'Работа с данными и доступ к ним','Обмен информацией','Пройдите на [портал по инф.безопасности]( http://sl.ge/*rucis_infosecurity) - Процедуры и инструкции - Разрешенные способы информационного обмена'),
       (8,'Работа с данными и доступ к ним','Главное меню',NULL),
       (9,'Приложения','Установка приложения на ваш компьютер','Пройдите на [сайт MyTech](https://mytech.ge.com/) - Products & Services - Software. Для более подробной инструкции взгляните на стр.32 [IT Handbook](https://ge.ent.box.com/s/xeiaqophfyqfd9r55wn7axeog6kml26y)'),
       (10,'Приложения','Работа со Skype for Business (SfB)','Для инструкции по работе со Skype for Business (SfB) взгляните на стр.19-25 [IT Handbook](https://ge.ent.box.com/s/xeiaqophfyqfd9r55wn7axeog6kml26y)'),
       (11,'Приложения','Главное меню',NULL),
       (12,'Пароль','Cмена пароля','Пройдите на [сайт Identity Manager](https://oneidm.ge.com/) - Password Management - Reset Passwords'),
       (13,'Пароль','Сброс пароля','Пройдите на [сайт MyPassword](https://mypassword.ge.com/) - Forgot password'),
       (14,'Пароль','Главное меню',NULL),
       (15,'Мобильная связь','Получение корпоративной сим карты и смена тарифа','Отправьте запрос на [mts@ge.com](mailto:mts@ge.com)'),
       (16,'Мобильная связь','Ознакомление с тарифным планом МТС','Взгляните на стр.39-49  [IT Handbook](https://ge.ent.box.com/s/xeiaqophfyqfd9r55wn7axeog6kml26y)'),
       (17,'Мобильная связь','Главное меню',NULL),
       (18,'Бронирование комнат','Бронирование TelePresence (TP)','Пройдите по [этой ссылке](http://sc.ge.com/*simpletp) для ознакомления с инструкцией'),
       (19,'Бронирование комнат','Бронирование комнат для конференций','Взгляните на стр.17-18  [IT Handbook](https://ge.ent.box.com/s/xeiaqophfyqfd9r55wn7axeog6kml26y)'),
       (20,'Бронирование комнат','Главное меню',NULL),
       (21,'Работа с почтой','Подозрительное письмо','Пройдите на [портал по инф.безопасности]( http://sl.ge/*rucis_infosecurity) - Как защитить себя и GE - Защита от фишинга'),
       (22,'Работа с почтой','Спам-фильтр','Пройдите на сайт [http://ge.com/spam](http://ge.com/spam). Выберите письма и нажмите на кнопку Deliver'),
       (23,'Работа с почтой','Главное меню',NULL),
       (24,'Удаленная работа','MyApps Anywhere','Большинство ресурсов работает через имеющийся на любом компьютере VPN-клиент MyApps Anywhere. Если он не установлен, установите его с [портала](http://myapps.ge.com)'),
       (25,'Удаленная работа','Mobile token','Пройдите на [сайт MyTech](http://mytech.ge.com) - Products & Services - Connectivity - Remote Access. Для более подробной инструкции взгляните на стр.31  [IT Handbook](https://ge.ent.box.com/s/xeiaqophfyqfd9r55wn7axeog6kml26y)'),
       (26,'Удаленная работа','Главное меню',NULL),
       (27,'Обращение к сотруднику IT','Удалённо','Пройдите на [сайт MyTech](http://mytech.ge.com) - Help & Support - Chat Now (зеленая круглая кнопка в нижней части сайта)'),
       (28,'Обращение к сотруднику IT','Локально','Пройдите в блок C на 10 этаж, места 114-117'),
       (29,'Обращение к сотруднику IT','Главное меню',NULL),
       (30,'Выйти', NULL, NULL)
