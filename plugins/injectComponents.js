import Vue from 'vue';

import BaseModalContainer from '~/components/BaseModalContainer';
import BaseModalBox from '~/components/BaseModalBox';
import BaseBtn from '~/components/ui/BaseBtn';
import BaseInput from '~/components/ui/BaseInput';
import BaseDropdown from '~/components/ui/BaseDropdown';
import LoaderScreen from '~/components/widgets/LoaderScreen';

Vue.component('base-modal-container', BaseModalContainer);
Vue.component('base-modal-box', BaseModalBox);
Vue.component('base-btn', BaseBtn);
Vue.component('base-input', BaseInput);
Vue.component('base-dropdown', BaseDropdown);
Vue.component('loader-screen', LoaderScreen);
