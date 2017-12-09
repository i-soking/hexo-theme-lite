import Vue from 'vue';
import Component from 'vue-class-component';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Meta } from '@/store/types';
import { Theme, Site } from '@/models/hexo-config.class';
import { MetaState } from '@/store/modules/global';
import TopNav from '../components/top-nav/TopNav.vue';
import TopHeader from '../components/top-header/TopHeader.vue';
import BottomFooter from '../components/bottom-footer/BottomFooter.vue';

@Component({
  name: 'app-layout',
  components: { TopNav, TopHeader, BottomFooter }
})
export default class AppLayout extends Vue {
  get theme(): Theme {
    return (this.$store.state.meta as MetaState).hexoConfig.theme;
  }

  get site(): Site {
    return (this.$store.state.meta as MetaState).hexoConfig.site;
  }

  asyncData({ store }: AsyncArgs): Promise<void> {
    return store.dispatch(`meta/${Fetch_Meta}`);
  }

  beforeMount() {
    // setting Title
    document.title = this.site.title || 'Hexo - Lite Theme';

    // setting Backgound Picture
    const { url, css_size, css_position } = this.theme.background;
    document.body.style.background = `url(${url}) ${css_position} / ${css_size} no-repeat fixed`;
  }
}