/*-----------------------------------------------------------------------------
This is a code for the Microsoft Bot Framework based bot, which uses Azure SQL
as its database to store questions and answers. The bot logic is built using
'botbuilder' & 'tediuos' libraries and their functions.

The code is written in Node.js (version used currently - v6.11.1)
Created by Sultan Duisenbay
-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------
                              AZURE SQL
This chunk of the code retrieves data (category of the questions, questions,
answers to those questions) from Azure SQL database. The data is then transfor-
med to be fed into the bot logic
-----------------------------------------------------------------------------*/

// import necessary modules from 'tedious' library
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

/* variables to save the required information from the database:
1) final - transformed array of dictionaries which is fed to botbuilder
           structure [{category:category1,question:[Q1,Q2,Q3],answer:[A1,A2,A3]},
                      {category:category2,question:[Q1,Q2,Q3],answer:[A1,A2,A3]},
                      ......]
2) result - raw array of dictionaries obtained from database query
            structure [{category:category1,question:Q1,answer:A1},
                       {category:category1,question:Q2,answer:A2},
                       ...]
3) category_list - array of unique categories in the query
                  structure [category1,category2,category3,...]*/
var final = [];
var result = [];
var category_list=[];

// configuration parameters to connect to your Azure SQL database
// change those to parameters for your database
var config =
   {
     userName: 'admin11', // update me
     password: '76653_aAA', // update me
     server: 'bot-qa.database.windows.net', // update me
     options:
        {
           database: 'TestData', //update me
           encrypt: true
        }
   }

// Initialize the connection with configuration parameters
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
{
  // check if there is an error & log it or execute a query
  if (err)
    {
      console.log(err)
    }
  else
    {
      console.log('Reading rows from the Table...');

      // send  a query, obtain the data and transform it to final version
      request = new Request("SELECT  category,question,answer FROM QAnew ORDER BY questionID", function(err, rowCount, rows)
      {
          // for loops to transform result variable to a final variable
          // logic finds the questions and answers with the same category and merges them into an array of dictionaries
          for(var i=0;i<category_list.length;i++)
          {
            var ArrQ = [];
            var ArrA = [];

            for(var j =0;j<result.length;j++)
            {
              if (result[j].category==category_list[i]){
                ArrQ.push(result[j].question);
                ArrA.push(result[j].answer);
              }
            }
            final.push({category: category_list[i],
                        question: ArrQ,
                        answer:ArrA});
          }
          // after the data has been obtained, start the bot
          startBot();
      });
      // create a dictionary for each row - item = {column1name:column1value,column2name:column2value,...}
      // and push each created dictionary into result array - result = [item1, item2, ...]
      // and extract all separate categories into category_list variable
      request.on('row', function(columns)
      {
        var item = {};

        columns.forEach(function(column)
        {
          item[column.metadata.colName] = column.value;
          if (column.metadata.colName == 'category' && !(category_list.includes(column.value)))
          {
            category_list.push(column.value);
          }
        });
        result.push(item);
        });
      // execute a query
      connection.execSql(request);
    }
});


/*------------------------------------------------------------------------------
                                BOT LOGIC
This chunk of code controls the bot logic, how dialogs are structured, and the
hierarchy of category - question - answer. The data from Azure SQL is fed here.
------------------------------------------------------------------------------*/

// import 'botbuilder' and 'restify' (to create a server) libraries
var builder = require('botbuilder');
var restify = require('restify');

// Initialize connection to bot by providing its AppID and appPassword
var connector = new builder.ChatConnector(
  {
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
  });

// create a server for bot
var server = restify.createServer();

// connect to a server using a specific port
server.listen(process.env.port || process.env.PORT || 3978, function ()
{
   console.log('%s listening to %s', server.name, server.url);
});

// use this function so that bot was receiving messages correctly
// change https://sultan-testbot.azurewebsites.net to your Web app bot's url
// leave the /api/messages part
// Example server.post('https://yourappname.azurewebsites.net/api/messages',connector.listen();)
server.post('https://sultan-testbot.azurewebsites.net/api/messages', connector.listen());

// wrap the whole bot logic into a function to be called after the SQL query has been executed
function startBot()
{
  // Initialize the bot
  var bot = new builder.UniversalBot(connector, [
      //initialize a session to send a welcome message and start main dialogue
      function (session)
      {
          // include a Typing... indicator
          session.sendTyping();
          // set a timer to incorporate some time for Typing... indicator
          setTimeout(function()
          {
            //send a welcome message
            session.send("Привет! Я GE Rus IT Chatbot. Я постараюсь ответить на ваши вопросы касательно ИТ. Введите"+
            " цифру, соответствующую интересующей Вас категории и нажмите Enter, затем"+
            " введите цифру, соответствующую вашему вопросу." );
            // include a Typing... indicator
            session.sendTyping();
            // set a timer to incorporate some time for Typing... indicator
            setTimeout(function()
            {
              // jump to the main dialogue
              session.beginDialog('Главное меню');
            },3000);
          },1000);
      },
      // a session which gets called when "Выйти" command is pressed
      function (session, results)
      {
        // include a Typing... indicator
        session.sendTyping();
        // set a timer to incorporate some time for Typing... indicator
        setTimeout(function()
        {
          // send a goodbye message
          session.endConversation("Надеюсь Вы нашли ответ на свой вопрос!");
        },800);
      }
  ]);

  // function to create dialogues for each of the questions
  function level1(x)
  {
    //initialize  a question dialogue
    bot.dialog(x.category, [
        function (session, args)
        {
          // include a Typing... indicator
          session.sendTyping();
          // set a timer to incorporate some time for Typing... indicator
          setTimeout(function()
          {
              //provide a list of choices for questions based on specific category
              builder.Prompts.choice(session, "Выберите вопрос:", x.question,
              {
                listStyle: builder.ListStyle.list,
                retryPrompt: `Пожалуйста выберите из предложенных опций`
              });
            },1000);

        },
        // function which executes after an answer in this dialogue is provided
        function (session, results)
        {
            // jump to a specific question's dialogue
            if (results.response.index<x.question.length-1)
            {
              session.beginDialog(x.question[results.response.index]);
            }
            //return to "Главное меню" if "Главное меню" is chosen
            else
            {
              session.endDialog();
            }
        }
    ]);
  }
  // Create main menu dialogue showing question categoies
  bot.dialog('Главное меню', [
      function (session)
      {
          //provide a list of categories to choose from
          builder.Prompts.choice(session, "Выберите категорию вопроса:", category_list,
          {
              listStyle: builder.ListStyle.list,
              retryPrompt: `Пожалуйста выберите из предложенных опций`,
          });
      },
      // function which executes after an answer in this dialogue is provided
      function (session, results)
      {
          // jump to a specific question's dialogue
          if (results.response.index<final.length-1)
          {
            session.beginDialog(final[results.response.index].category);
          }
          // exit fully from the conversation if "Выйти" is chosen
          else
          {
            session.endDialog();
          }

      },
      // function which executes when an answer to a question is provided, reloads the main menu
      function (session)
      {
          // include a Typing... indicator
          session.sendTyping();
          // repeat this  menu
          setTimeout(function(){
            session.replaceDialog('Главное меню');
          },3000);
      }
  ]).reloadAction('showMenu', null, { matches: /^(меню|назад)/i });

  // use for loops to automatically call function for different question dialogues
  for (var i=0; i<final.length-1; i++)
  {
    eval(`level1(final[${i}])`);
  }

  // function to create dialogues for each of the answers
  function level2(x,y)
  {
    // initialize an answer dialogue
    bot.dialog(x.question[y], [
        function (session)
        {
          // include a Typing... indicator
          session.sendTyping();
          // provide an answer to an asked question after a delay (for typing indicator)
          setTimeout(function()
          {
            session.endDialog(x.answer[y]);
          },1000);
        },
    ]);
  }

  // use for loops to automatically call function for different answer dialogues
  for (var j=0; j<final.length-1; j++)
  {
    for (var k=0; k<final[j].answer.length-1; k++)
    {
      eval(`level2(final[${j}],${k})`);
    }
  }
}
