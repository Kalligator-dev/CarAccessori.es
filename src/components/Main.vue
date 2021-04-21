<template>
  <section class="section-1">
    <div class="sec-1-lt">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        asperiores sint accusantium porro iusto tenetur alias aut dolorem quis
        id? Doloribus, odit eligendi perferendis natus, unde soluta dolor quia
        iusto, perspiciatis asperiores repellat doloremque necessitatibus alias
        voluptates! Eos facilis consectetur, delectus suscipit autem ipsam iste
        nisi! Non dignissimos odit obcaecati quaerat placeat harum quis laborum
        perspiciatis, odio officiis eligendi quia vel rerum ducimus eaque labore
        quos? Sunt itaque asperiores tempora sit pariatur culpa iure, porro
        deleniti dolores? Minus eum eveniet maiores laborum, at est a neque
        minima eligendi, nesciunt necessitatibus enim et veniam in magnam rerum
        veritatis quam tempore ad perferendis ipsa laudantium. Dignissimos sit
        dolorum odio harum repellendus, a, iste ipsa placeat quidem accusamus
        veniam debitis expedita consequuntur? Qui impedit sequi cupiditate vero
        voluptatibus consequuntur nobis facere minima pariatur, dolor magnam.
        Nostrum eos exercitationem aspernatur aliquid, dolor velit! Praesentium
        libero delectus vitae placeat a laboriosam velit ipsam quas suscipit ad
        veniam maiores ab voluptatum, ipsa possimus vel doloremque deserunt vero
        nemo. Vero aut odio rerum provident inventore saepe quas quia adipisci
        perferendis obcaecati nihil distinctio, maiores tenetur voluptate ea.
      </p>
      <h2>HOLA!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit explicabo
        eius, ea vitae ducimus incidunt, praesentium, cumque tempora dicta
        corrupti possimus facere laborum fugiat id hic placeat nisi? Laudantium
        omnis inventore id soluta quod voluptatum ullam beatae, magni
        perspiciatis neque nihil esse consectetur nesciunt voluptatem doloribus
        nemo iusto aspernatur facere quo dolorem, modi perferendis quaerat.
        Architecto, soluta quae ducimus repellendus excepturi nihil aliquid
        iusto neque, non incidunt quia accusantium maiores optio corrupti
        molestias velit odio dignissimos fugit! Nemo, eveniet eligendi. Quos
        labore accusamus, at voluptatibus perferendis, eos quis saepe maxime
        eveniet dolorem laudantium omnis esse, laboriosam blanditiis. Itaque
        blanditiis commodi pariatur similique, ea libero quia voluptate tempora
        soluta veniam culpa architecto eaque inventore reprehenderit rerum velit
        cumque. Alias asperiores quod deleniti, ipsum odit eaque ipsa cumque
        porro quidem est sit?
      </p>
      <div class="marg marg-rt"></div>
    </div>
    <div class="sec-1-rt">
      <div class="marg marg-lt"></div>
      <h2>Hello!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        numquam autem ut incidunt quis veniam voluptate ipsam deleniti, dolores
        optio pariatur ipsa, repellendus unde excepturi distinctio reiciendis
        quam atque praesentium ex saepe. Non optio aliquam doloremque, odio in
        incidunt aliquid omnis vero consequuntur placeat, alias nostrum qui esse
        ex consequatur quidem. Blanditiis vitae dolore consequatur dicta optio
        sit magni impedit quibusdam cupiditate nostrum, praesentium dolorum
        adipisci, facilis maiores dolor et accusamus beatae repellat eius porro
        ad mollitia, architecto quasi. Officia magnam facere dolor,
        exercitationem soluta, non placeat distinctio nobis id tenetur eveniet
        corrupti atque quasi quisquam, veritatis iure voluptatibus repellendus
        quibusdam! Voluptatem aut itaque nobis ullam ratione, quia, quibusdam
        alias laboriosam optio tempore saepe! Voluptatibus ad corporis explicabo
        porro minima mollitia sit dolore sed accusamus provident quam, ut illum,
        quia debitis omnis aspernatur molestias nihil vitae itaque. Distinctio,
        temporibus! Ex illo placeat, et mollitia voluptatibus unde consequatur
        molestias, est laudantium accusantium commodi consectetur. Praesentium
        vero commodi facilis voluptatem laboriosam eos temporibus saepe fugit
        eum ea libero, aliquam iure ipsum mollitia perferendis aut asperiores
        odit, corrupti pariatur quaerat aspernatur iusto sapiente. Magni
        reiciendis dicta, ad nihil iste distinctio officiis facilis. Iste cum
        consequatur reiciendis eum, distinctio non neque at eius, voluptatum
        architecto id quis sapiente placeat soluta fugiat est hic. Cum impedit
        non dignissimos placeat ab, quae ad ratione eos enim quam eum
        consequuntur deleniti quis necessitatibus accusamus libero voluptatum
        voluptatem odit iste amet! At velit officiis maiores aliquid modi sed
        cum consequatur blanditiis, ipsam perspiciatis, earum repudiandae,
        voluptas nam exercitationem repellendus ratione odit nulla quas.
        Repellendus alias dolor, voluptatum dolorum vel provident nihil maiores
        molestias, consequatur officia atque vitae. Aliquid nemo atque velit
        doloribus laboriosam laborum quas, suscipit blanditiis consequatur
        perspiciatis facere iusto, rerum nobis corporis nesciunt quos
        consectetur, ipsa in modi nisi quaerat mollitia at unde! Perferendis,
        eveniet quia?
      </p>
    </div>
  </section>
  <section></section>
</template>

<script>
export default {};
</script>

<style scoped>
h2 {
  font-size: 7rem;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100vw;
}
div {
  height: 100%;
  width: 50%;
  padding: 0.5rem;
}
.sec-1-lt {
    z-index: 5;
  padding-right: 0;
  background-color: hotpink;
  clip-path: polygon(0% 0%, 100% 0, 85% 100%, 0 100%);
  margin-right: -5.6rem;
}
.sec-1-rt {
    padding-left: 0;
  background-color: pink;
  clip-path: polygon(15% 0%, 100% 0, 100% 100%, 0 100%);
  shape-outside: polygon(15% 0%, 100% 0, 100% 100%, 0 100%);
}
.marg {
  width: 100%;
  height: 100%;
  shape-margin: 10px;
}
.marg-lt {
    float: left;
  shape-outside: polygon(0% 0%, 15% 0, 0% 100%);
  clip-path: polygon(0% 0%, 15% 0, 0% 100%);
  background-color: yellow;
}
.marg-rt {
    float: right;
  shape-outside: polygon(100% 0%, 100% 100%, 85% 100%) padding-box;
  clip-path: polygon(100% 0%, 100% 100%, 85% 100%);
  background-color: yellow;
}
</style>
