import React, { Component } from 'react';
import qa from '../images/qa.png'
import bert from '../images/bert.png'
import electra from '../images/electraa.jpg'

class Home extends Component {

    render() {
        return (
            <div>
                <p className="title">Doğal Dil İşleme Kullanılarak Soru-Cevap Sistemi</p>
                <div className="qa">
                    <img className="image" src={qa}></img>
                </div>

                <p className="text">Doğal dil işleme çalışmalarının bir parçası olan soru cevaplama çalışmalarında amaç, doğal dildeki bir soruya doğru cevap verebilmektir. Soru cevaplama çalışmalarını bir kaç farklı şekilde gruplamak mümkündür.
                <br/>
                <b>Soru alanına göre Soru Cevap</b> Çoğu zaman çalışmaların kolaylaştırılması için soruların berlili bir metin içerisinden cevaplanması istenir. Yani bir insanın hayatı boyunca öğrendiği şeylerin bilgisayar tarafından bir insan gibi cevaplanması her ne kadar bu çalışmayı yapan kişilerin hayali olsa da henüz bu seviyey ulaşmak için çok erkendir. Bunun yerine, günümüz çalışmalarında, bilgisayara yine doğal dilde yazılmış bir metin verilerek bu metin içerisinden sorulan soruların cevaplanması beklenmektedir. Bu anlamda soru cevaplamada iki farklı soru alanı belirlenebilir:
                Açık alanlı sorular ve Kapalı alanlı sorular. İlk gruba örnek olarak belirli bir konudaki soruları düşünebiliriz. Örneğin sadece ilaç sektörüne yönelik sorular veya spor sorularını düşünebiliriz.
                Örneğin “Türkiyenin en çok kazanan oyuncusu kimdir?” sorusuna sinema konusunda farklı bir cevap veya spor konusunda farklı bir cevap verilebilir.  Eğer soruların alanları tanımlıysa bu problem ortadan kalkar, aksi halde soru cevaplayan program bu ayrımı yapabilmelidir.
                <br />
                    <b>Cevap tipine göre Soru Cevap</b> Bazı soruların cevapları kısa bir kelime ile verilebilen ve genelde belirli cevaplardır. Örneğin “Türkiye Cumhuriyetinin ilk CumhurBaşkanı kimdir?” sorusunun tek bir cevabı vardır ve herkes bu soruya aynı cevabı verir.
                Ancak “Türkiye Cumhuriyetinin ilk Cumhur Başkanı nasıl birisidir?” gibi bir sorunun cevabı belirli bir cevap değildir. Yani sorunun  her muhatabı farklı cevaplar verebilir. Bu durumda cevabın belirliliğine göre soru cevaplama çalışmalarını ayırmak mümkündür. Dolayısıyla cevap tiplerine göre sorular ikiye ayrılabilir:
                Belirli Cevaplar ve Belirsiz Cevaplar.
                <br/>
                    <b>Soru Cevaplama Yöntemine Göre</b> Soru cevaplama sırasında kullanılan yönteme göre yapılan çalışmaları iki ayrı grupta toplamak mümkündür.
                Sığ Yöntemler ve Derin Yöntemler. Eğer kullanılan yöntem cümle içerisindeki basit yapıların yakalanması, cümle içinde geçen bazı kelimelerden sorunun anlamının çıkarılması gibi tekniklere dayanıyorsa bu cevaplama yöntemine sığ yöntem ismi verilmektedir.
                Eğer kullanılan yöntem, kelimelerde başlayarak kelimebilim, cümle dizilimi ve anlambilim gibi aşamalara ayrılıyorsa hatta, hazf, dönüştü, eş atıf çözümü, ilgi belirsizliği ontoloji ve benzeri problemleri de çözüyorsa sığ yöntem ismi verilebilir.
                    <a href="https://rajpurkar.github.io/SQuAD-explorer/" target="_blank"> <b>Squad Veri Seti</b></a>
                </p>

                <div>
                    <p className="title" >Neler Yaptık?</p>
                    <p className="text">Yarışma için verilen metne bağlı sorulan soruların cevaplandırılması konusu üzerinde çalıştık. Fakat bunu yapmadan önce ilk olarak hem kendimizin kullanabileceği hem de başka çalışmalarda da kullanabilecek bir veri seti hazırlamakla işe başladık. Konu bütünlüğünü sağlayabilmek için soru-cevaplarımızı Osmanlı Tarihi üzerine oluşturduk ve bu bağlamda toplam 6234 kadar soru çıkarttık.
                    Bir sonraki aşamada bu elde ettiğimiz soru ve cevap ikililerini BERT ve ELECTRA algoritmalarına vererek modelimizi eğittik. BERT kelimeleri tek tek değerlendirmek yerine, önündeki ve arkasındaki kelimeler ya da benzer ve eş anlamlı kelimeler ile birlikte değerlendirme yapmaktadır. Bu da bize karmaşık soruların çok daha iyi anlaşılıp, çözümlenme olanğı sağlamaktadır. Bu iki algoritmayı kullanarak ve parametrelerini değiştirerek modelimizi en iyi şekilde eğitmeyi hedefledik.
                </p>
                </div>


                <p className="title" >Kullandığımız Algoritmalar</p>
                <div class="container">
                    <div>
                        <img src={bert} className="bertImage"></img>
                        <p className="title">BERT</p>
                        <p className="textt">BERT Transformatörlerden Çift Yönlü Kullanıcı Beyanı anlamına gelir ve sinir ağlarına dayanan bir algoritma modelini ifade etmektedir. Yapay zeka ve makine öğrenimini bir arada kullanan BERT bir cümle içerisinde geçen tüm anahtar kelimeleri bağlam açısından daha doğru olacak şekilde değerlendirmektedir. Basitçe söylemek gerekirse, Google bir arama sorgusunun içeriğini daha iyi anlamaya çalışmak ve kullanıcıların yaptığı sorguları daha doğru yorumlamak için BERT algoritmasını kullanacaktır.
                        Klasik dil işleme modelleri bir cümle içindeki kelimeleri soldan sağa ya da sağdan sola olmak üzere tek yönlü okurken BERT algoritması ile bu okuma işlemi iki yönlü olacak şekilde gerçekleşmektedir. Kısaca bu algoritma hayata geçmeden önce Google, arama sorgularını kelime bazlı yorumlardı. BERT teknolojisi sayesinde arama sorgularını bir bütün olarak değerlendirilebilecek.
                        </p>
                    </div>
                    <div>
                        <img src={electra} className="bertImage"></img>
                        <p className="title">ELECTRA</p>
                        <p className="textt">“ELECTRA: Metin Kodlayıcıları Üreticilere Göre Ayrımcı Olarak Ön Eğitim” bölümünde, BERT'nin faydalarını sağlayan ancak çok daha verimli öğrenen dil ön eğitimine farklı bir yaklaşım uyguluyor. ELECTRA - Token Değiştirmelerini Doğru Olarak Sınıflandıran Enkoderi Etkin Bir Şekilde Öğrenmek - aynı hesaplama bütçesi göz önüne alındığında mevcut tekniklerden daha iyi performans gösteren yeni bir ön eğitim yöntemidir. Örneğin, ELECTRA, hesaplamalarının ¼ değerinden daha azını kullanırken GLUE doğal dil anlama ölçütündeki RoBERTa ve XLNet'in performansıyla eşleşir ve SQuAD soru cevaplama ölçütünde en son sonuçları elde eder. ELECTRA’nın mükemmel verimliliği, küçük ölçekte bile iyi çalıştığı anlamına gelir - 30x daha fazla hesaplama kullanan bir model olan GPT'den daha iyi doğruluk için birkaç gün içinde tek bir GPU'da eğitilebilir. ELECTRA, TensorFlow'un üstünde açık kaynak kodlu bir model olarak piyasaya sürülüyor ve kullanıma hazır, önceden eğitilmiş bir dil sunum modellerini içeriyor.
                        </p>
                    </div>
                </div>

                <p className="proje">Proje Ekibi</p>
                <p className="textProje">Merhaba, ekibimizin adı ENELPİ. Ekip oalrak 4 kişiden oluşuyoruz. Ekibimizin başında hem eğitim hayatımızda hem de yarışmada bizimle olan Aydın Adnan Menderes Üniversitesi Bilgisayar Bölümü hocalarımızdan Fatih Soygazi hocamız bulunmaktadır. Ekipte geriye kalanlar ise Aydın Adnan Menderes Üniversitesi Bilgisayar Mühendisliği Bölümünden 2020 yılı itibariyle mezun olmuş üç arkadaş. Adlarımız sırasıyla Okan Çifti, Uğurcan Kök ve Filiz Gözet. Üçümüz de bölüme girdiğimizden beri Doğal Dil İşleme üzerine çalışmaktayız.Bu yüzden Türkiye Açık Kaynak Platformu'nun Türkçe Doğal Dil İşleme konusunda farkındalık oluşturmak amacıyla düzenlediği bu yarışmaya katılarak biz de çalışmalara katkı sağlamak istedik.
                </p>

            </div>

        );
    }
}

export default Home;
