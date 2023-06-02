const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));


/*app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'main.html');

    if (req.url.includes('.css')) {
        const cssPath = path.join(__dirname, req.url);
        fs.readFile(cssPath, (err, content) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'text/css');
                res.send(content);
            }
        });
        return;
    }

    if (req.url.includes('.js')) {
        const jsPath = path.join(__dirname, req.url);
        fs.readFile(jsPath, (err, content) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'application/javascript');
                res.send(content);
            }
        });
        return;
    }

    // Чтение файла HTML
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(content);
        }
    });
});*/


const MongoClient = require('mongodb').MongoClient;

const mongoUri = 'mongodb+srv://islamkazproject:<password>@clustertest.b2y4uxi.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(mongoUri, (err, client) => {
    if (err) {
        console.error('Ошибка подключения к MongoDB Atlas:', err);
        return;
    }

    const db = client.db();
    const collectionName = 'Sliders';

    // Создание коллекции
    db.createCollection(collectionName, (err, collection) => {
        if (err) {
            console.error('Ошибка при создании коллекции:', err);
            return;
        }

        console.log('Коллекция успешно создана:', collection);

        // Вставка документа
        const document = {
            image: "https://bookskazan.ru/upload/iblock/84d/ogiobzlfjsbzgxrdj55ohfuy923l7ii0/Набор%20канцтоваров%20виджет.png",
            alt: "slide7"
        };
        collection.insertOne(document, (err, result) => {
            if (err) {
                console.error('Ошибка при вставке документа:', err);
                return;
            }

            console.log('Документ успешно вставлен:', result);

            // Обновление документа
            const filter = {
                image: "https://bookskazan.ru/upload/iblock/84d/ogiobzlfjsbzgxrdj55ohfuy923l7ii0/Набор%20канцтоваров%20виджет.png"
            };
            const update = {$set: {alt: "slide8"}};
            collection.updateOne(filter, update, (err, result) => {
                if (err) {
                    console.error('Ошибка при обновлении документа:', err);
                    return;
                }

                console.log('Документ успешно обновлен:', result);

                // Удаление документа
                const deleteFilter = {
                    image: "https://bookskazan.ru/upload/iblock/84d/ogiobzlfjsbzgxrdj55ohfuy923l7ii0/Набор%20канцтоваров%20виджет.png"
                };
                collection.deleteOne(deleteFilter, (err, result) => {
                    if (err) {
                        console.error('Ошибка при удалении документа:', err);
                        return;
                    }

                    console.log('Документ успешно удален:', result);

                    collection.find({}).toArray((err, result) => {
                        if (err) {
                            console.error('Ошибка при получении данных:', err);
                            return;
                        } else {
                            result.forEach((document) => {
                                console.log('image:', document.image);
                                console.log('alt:', document.alt);
                            });
                        }
                        ;
                        console.log('Данные из базы данных:', result);

                        // Закрытие соединения
                        client.close();
                    });
                });
            });
        });
    });
});
//
// const port = 3000;

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
