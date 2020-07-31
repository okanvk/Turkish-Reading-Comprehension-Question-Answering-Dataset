# ENELPİ - Soru Cevap Sistemi

## Biz kimiz ?
Merhaba biz Adnan Menderes Üniversitesi Bilgisayar Mühendisliği Bölümünden 2020 yılı itibariyle mezun olmuş üç arkadaşız. Adlarımız sırasıyla Okan Çifti, Uğurcan Kök ve Filiz Gözet. Üçümüz de bölüme girdiğimizden beri Doğal Dil İşleme üzerine çalışmaktayız. Bu yüzden Türkiye Açık Kaynak Platformu'nun Türkçe Doğal Dil İşleme konusunda farkındalık oluşturmak amacıyla düzenlediği bu yarışmaya katılarak biz de çalışmalara katkı sağlamak istedik.

## Soru Cevaplama
Soru cevaplama (Question Answering), insanların doğal dilde yönelttikleri soruları otomatik olarak cevaplayan yapı sistemleri ile ilgilenen, bilgi alma ve doğal dil işleme (NLP) alanlarında bir bilgisayar bilimi disiplinidir. Teknolojinin hızla gelişmesiyle beraber artan verileri sorgulama önemli bir hal almıştır. Biz de bu yüzden henüz Türkçe'de çok kullanımı olmayan BERT ve ELECTRA algoritmalarını kullanarak verilen metne bağlı sorulan soruların cevaplandırılması üzerinde çalıştık.

## Veri Seti
Çalışmamıza başlamadan önce hem kendimizin kullanabileceği hem de başka çalışmalarda da kullanılabileceğini düşündüğümüz bir veri seti hazırlamakla işe başladık. Konu bütünlüğünü sağlayabilmek için soru-cevaplarımızı Osmanlı Tarihi üzerine oluşturduk ve bu bağlamda toplam 6234 soru çıkarttık. Bu verileri modelimize verebileceğimiz en uygun hale getirerek JSON formatında tuttuk.

```json
{
    "title": "Boğazlar Sözleşmesi",
    "paragraphs": [{
            "qas": [{
                    "question": "Boğazlar Sözleşmesi ne zaman imzalandı ?",
                    "id": 308,
                    "answers": [{
                            "answer_start": 0,
                            "text": "13 Temmuz 1841 tarihinde"
                        }
                    ]
                }, {
                    "question": "Boğazlar Sözleşmesi nerede imzalandı ?",
                    "id": 309,
                    "answers": [{
                            "answer_start": 25,
                            "text": "Londra kentinde"
                        }
                    ]
                }
            ],
            "context": "13 Temmuz 1841 tarihinde Londra kentinde imzalanan bu sözleşme ile boğazların tarafsız hale gelmesi de amaçlandı. 1841 Boğazlar Sözleşmesi ile barış zamanında herhangi bir devlete ait olan savaş gemilerinin geçişine izin verilmemesi garanti edilmiş olacaktı. Yalnız boğazların sadece savaş döneminde bu tür bir kapalı durumda yer alması da sağlanacaktı. Osmanlı Devleti; herhangi bir savaş halinde yer alması halinde ise boğazları istediği biçimde kullanma hakkına sahip olacaktı. Osmanlı Devleti savaşa girdiği için boğazlar üzerindeki savaş gemilerinin geçişi üzerine tasarruf hakkını kullanmıştır. Müttefikleri Fransa ve İngiltere’nin geçişine izin vermiştir."
        }
    ]
}
```
Toplam Veri Sayıları
|               |  Başlık/Title  |   Paragraf/Context   | Question-Answer / Soru-Cevap |
| ------------- |:--------------:|:--------------------:|:----------------------------:|
|     Train     |      750       |       2370           |           14107              |
|     Test      |      85        |        301           |            1330              |


## Model Kullanımı

Bir sonraki aşamada elde ettiğimiz soru ve cevap sit bilgileri BERT ve ELECTRA algoritmalarına vererek modelimizi eğittik.
- BERT kelimeleri tek tek değerlendirmek yerine, önündeki ve arkasındaki kelimeler ya da benzer ve eş anlamlı kelimeler ile birlikte değerlendirme yapmaktadır. Bu da bize karmaşık soruların çok daha iyi anlaşılıp, çözümlenme olanağı sağlamaktadır.
- ELECTRA, BERT'in faydalarını sağlayan ancak aynı hesaplama bütçesi göz önüne alındığında mevcut tekniklerden daha iyi performans gösteren yeni bir ön eğitim yöntemidir.
Biz çalışmamızda bu algoritmayı kullanarak ve parametrelerini değiştirerek modelimizi eğitip en iyi sonucu bulmayı hedefledik.

### BERT

| Model/Hyperparameters | epoch | max_seq_length | learning_rate | per_gpu_train_batch_size |
|:----------------------|:-----:|:--------------:|:-------------:|:------------------------:|
|    BERT, Uncased#1    |   7   |      384       |     3e-5      |           16             |
|    BERT, Uncased#2    |   5   |      384       |     3e-5      |           16             |
|    BERT, Cased        |   5   |      384       |     3e-5      |           16             |


### ELECTRA

| Model/Hyperparameters | epoch | max_seq_length | per_gpu_train_batch_size |
|:----------------------|:-----:|:--------------:|:------------------------:|
|     Electra           |       |     512        |                          |        


### RESULTS
|   Model/Score   |    F1    |    Exact   |  Loss Exact  |
|:----------------|:--------:|:----------:|:------------:|
| Electra         | 78.87011 |  57.80031  |     0.42     |   
| BERT, Cased     | 80.15858 |  61.85647  |      -       |
| BERT, Uncased#1 | 79.9342  |  61.70044  |      -       |


## Web Uygulaması

Eğittiğimiz modelleri kullanarak bir web arayüzü tasarladık. Kullanıcı metni ve sormak istediği soruları girerek cevap alabilir.
![alt text](https://github.com/okanvk/ENELPI---Soru-Cevap-Sistemi/blob/master/images/images1.jpeg?raw=true)
![alt text](https://github.com/okanvk/ENELPI---Soru-Cevap-Sistemi/blob/master/images/images5.jpeg?raw=true)

Pytorch modelleri repoya büyüklüğünden dolayı eklenmemiştir.
İstenen modellere göre modeller, şuradan indirilebilir,
https://huggingface.co/enelpi

## Gereksinimler
- Python
- Flask
- Transformers
- Pytorch
- React

## Referanslar
Çalışma esnasında kullandığımız kaynaklar aşağıda yer almaktadır.
- https://github.com/stefan-it/turkish-bert
- https://github.com/TQuad/turkish-nlp-qa-dataset
- https://rajpurkar.github.io/SQuAD-explorer/
- https://arxiv.org/abs/1806.03822
- https://arxiv.org/abs/1810.04805
- https://arxiv.org/abs/2003.10555
- https://huggingface.co/transformers/

## Teşekkür
Bu çalışmayı yapmamız sırasında bizden desteklerini esirgemeyen Fatih SOYGAZİ'ye ve mentorumuz Yusuf YİĞİT'e çok teşekkür ederiz.
