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
|     Train     |      756       |       2400           |           14224              |
|     Test      |      85        |        301           |            1330              |


## Model Kullanımı

Bir sonraki aşamada elde ettiğimiz soru ve cevap sit bilgileri BERT ve ELECTRA algoritmalarına vererek modelimizi eğittik.
- BERT kelimeleri tek tek değerlendirmek yerine, önündeki ve arkasındaki kelimeler ya da benzer ve eş anlamlı kelimeler ile birlikte değerlendirme yapmaktadır. Bu da bize karmaşık soruların çok daha iyi anlaşılıp, çözümlenme olanağı sağlamaktadır.
- ELECTRA, BERT'in faydalarını sağlayan ancak aynı hesaplama bütçesi göz önüne alındığında mevcut tekniklerden daha iyi performans gösteren yeni bir ön eğitim yöntemidir.
Biz çalışmamızda bu algoritmayı kullanarak ve parametrelerini değiştirerek modelimizi eğitip en iyi sonucu bulmayı hedefledik.

### BERT

| Model/Hyperparameters | epoch | max_seq_length | learning_rate | per_gpu_train_batch_size |
|:----------------------|:-----:|:--------------:|:-------------:|:------------------------:|
|    BERT, Cased#1      |   3   |      256       |     3e-5      |           16             |
|    BERT, Cased#2      |   3   |      384       |     3e-5      |           16             | 
|    BERT, Cased#3      |   3   |      512       |     3e-5      |           16             |
|    BERT, Cased#4      |   5   |      256       |     3e-5      |           16             |
|    BERT, Cased#5      |   5   |      384       |     3e-5      |           16             |
|    BERT, Cased#6      |   5   |      512       |     3e-5      |           16             |


### ALBERT

| Model/Hyperparameters | epoch | max_seq_length | learning_rate | per_gpu_train_batch_size |
|:-------------------------------------|:-----:|:--------------:|:-------------:|:------------------------:|
|    Albert, Uncased#1- SentencePiece  |   5   |      512       |     3e-5      |           16             |


### ELECTRA

| Model/Hyperparameters | epoch | max_seq_length | per_gpu_train_batch_size | 
|:----------------------|:-----:|:--------------:|:------------------------:|
|   Electra, Cased#1    |   5    |     512       |           16             |
|   Electra, Cased#2    |   3    |     512       |           16             |
|   Electra, Cased#3    |   3    |     384       |           16             | 


### RESULTS
|   Model/Score   |    F1    |    Exact   |
|:----------------|:--------:|:----------:|
|    Electra#1    | 81.33747 |  62.55850  | 
|    Electra#2    | 80.74756 |  61.23244  | 
|    Electra#3    | 80.11426 |  60.60842  |
|    BERT#1       | 79.78570 |  61.54446  |
|    BERT#2       | 80.02698 |  61.38845  |
|    BERT#5       | 80.54542 |  62.24648  |
|    BERT#6       | 80.71284 |  62.01248  |
|    Albert#1     | 69.91283 |  48.90795  |


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


## Citation
