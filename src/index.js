Vue.config.productionTip = false;
Vue.use(window.vueCompositionApi.default);
const { ref, reactive, computed, toRefs, onMounted, watch } = window.vueCompositionApi;

Vue.component('child', {
    template: `
        <div>
            <button v-on:click="emit">Clique me to emit from child component</button>
        </div>
    `,
    methods: {
        emit: function() {
            this.$emit('event_child', 1);
        }
    }
});

Vue.component('i-lock', {
    template: `
    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"/>
    </svg>
    `
});
Vue.component('i-text', {
    template: `
    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M24 20v1h-4v-1h.835c.258 0 .405-.178.321-.422l-.473-1.371h-2.231l-.575-1.59h2.295l-1.362-4.077-1.154 3.451-.879-2.498.921-2.493h2.222l3.033 8.516c.111.315.244.484.578.484h.469zm-6-1h1v2h-7v-2h.532c.459 0 .782-.453.633-.887l-.816-2.113h-6.232l-.815 2.113c-.149.434.174.887.633.887h1.065v2h-7v-2h.43c.593 0 1.123-.375 1.32-.935l5.507-15.065h3.952l5.507 15.065c.197.56.69.935 1.284.935zm-10.886-6h4.238l-2.259-6.199-1.979 6.199z"/>
    </svg>
    `
});

Vue.component('i-what', {
    template: `
        <i-lock v-if="!!psw"></i-lock>
        <i-text v-else></i-text>
    `,
    props: ['psw']
});

const FORMSDATA = [
    {
        formDef: {
            formId: 'form0-log',
            label: 'Login',
            fields: [
                {
                    type: 'password',
                    placeholder: "Password",
                    name: 'password',
                    autocomplete: 'pm-password',
                    value: 'maxzz-pass',
                    dataFtype: 0 // old
                },
            ],
            formLogin: true,
            randomizeIds: true,
        },
        checkboxes: {
            name: 'form0-log',
            disp: 'Login',
            show: false,
        },
    },
    {
        formDef: {
            formId: 'form0-log-abc',
            label: 'Login a+user+b+pass+c+btn',
            fields: [
                {
                    type: 'text',
                    placeholder: "Second ID",
                    name: 'username2',
                    autocomplete: 'pm-username2',
                    value: 'pin code',
                    dataFtype: -1 // not a password
                },
                {
                    type: 'password',
                    placeholder: "Password",
                    name: 'password',
                    autocomplete: 'pm-password',
                    value: 'maxzz-pass',
                    dataFtype: 0 // old
                },
            ],
            formLogin: true,
            randomizeIds: true,
        },
        checkboxes: {
            name: 'form0-log-abc',
            disp: 'Login a+user+b+pass+c+btn',
            show: false,
        },
    },
    {
        formDef: {
            formId: 'formA-nn',
            label: 'Change: New+New',
            fields: [
                {
                    type: 'password',
                    placeholder: "Password New",
                    name: 'password-new',
                    autocomplete: 'new-password',
                    dataFtype: 1 // new
                },
                {
                    type: 'password',
                    placeholder: "Password Confirm",
                    name: 'password-confirm',
                    autocomplete: 'new-password',
                    dataFtype: 1 // new
                },
                {
                    type: 'hidden',
                    name: 'username',
                    autocomplete: 'username',
                    value: 'maxzz',
                    dataFtype: -1
                },
            ]
        },
        checkboxes: {
            name: 'formA-nn',
            disp: 'Change password: New+New',
            show: true,
        },
    },
    {
        formDef: {
            formId: 'formB-cn',
            label: 'Change: Cur+New',
            fields: [
                {
                    type: 'password',
                    placeholder: "Password Current",
                    name: 'password-current',
                    autocomplete: 'current-password',
                    dataFtype: 0 // old
                },
                {
                    type: 'password',
                    placeholder: "Password New",
                    name: 'password-new',
                    autocomplete: 'new-password',
                    dataFtype: 1 // new
                },
                {
                    type: 'hidden',
                    name: 'username',
                    autocomplete: 'username',
                    value: 'maxzz',
                    dataFtype: -1
                },
            ]
        },
        checkboxes: {
            name: 'formB-cn',
            disp: 'Change password: Cur+New',
            show: true,
        },
    },
    {
        formDef: {
            formId: 'formC-cnn',
            label: 'Change Cur+New+New',
            fields: [
                {
                    type: 'password',
                    placeholder: "Password Current",
                    name: 'password-current', // <- always current
                    autocomplete: 'current-password',
                    dataFtype: 0 // old
                },
                {
                    type: 'password',
                    placeholder: "Password New",
                    name: 'password-new',
                    autocomplete: 'new-password',
                    dataFtype: 1 // new
                },
                {
                    type: 'password',
                    placeholder: "Password Confirm",
                    name: 'password-confirm',
                    autocomplete: 'new-password',
                    dataFtype: 1 // new
                },
                {
                    type: 'hidden',
                    name: 'username',
                    autocomplete: 'username',
                    value: 'maxzz',
                    dataFtype: -1
                },
            ]
        },
        checkboxes: {
            name: 'formC-cnn',
            disp: 'Change password: Cur+New+New',
            show: true,
        },
    },
];

function setAttrs(el, attrs) {
    Object.keys(attrs).forEach(_ => el.setAttribute(_, attrs[_]));
}

const STORAGE_USERFORM = 'd16-userform';
const STORAGE_DATAFORM = 'd16-dataform';
const STORAGE_VAULT = 'd16-vault';
const STORAGE_SHOWFORMS = 'd16-showforms';

Vue.component('user-form', {
    template: '#test-template',
    props: ['formName'],
    setup(props, ctx) {

        /*
        type Field = {
            type: 'password' | 'hidden' | 'text',
            placeholder: string;
            name: 'password-current' | 'password-new' | 'password-confirm' | 'username';
            autocomplete: 'username' | 'new-password' | 'current-password';
            value?: string;
            dataFtype: 0 | 1 | -1; // 0 = old | 1 = new | -1 = ignore (for username fields)
        }
        */
        const dataa = reactive({
            formId: '',
            formLabel: '',
            formLogin: false, // to hide the password change specific controls
            randomizeIds: false,
            loading: true,

            dataFtypes: [], // fill-values: 0 - old; 1 - new

            watching: {
                field_username: '',
                fields: [], // Field[]

                options: {
                    hasUsername: false,
                    hasLogin: true, // hasLogin for password change or randomize for logins
                    showPsws: false,
                },
            },
        });

        function loadStore() {
            const cnt = localStorage.getItem(`${STORAGE_USERFORM}-${dataa.formId}`);
            const s = cnt && JSON.parse(cnt);
            if (s) {
                dataa.watching.field_username = s.field_username;
                dataa.watching.fields.map((_, index) => _.value = s.fields[index]),
                dataa.watching.options = s.options;

                randomizeIDs(dataa.watching.fields, dataa.watching.options.hasLogin);
            }
        }
        function saveStore() {
            const s = {
                field_username: dataa.watching.field_username,
                fields: dataa.watching.fields.map(_ => _.value),
                options: dataa.watching.options,
            };
            localStorage.setItem(`${STORAGE_USERFORM}-${dataa.formId}`, JSON.stringify(s));
        }

        watch(() => dataa.watching, () => dataa.loading ? (dataa.loading = false) : saveStore(), {deep: true});

        function randomizeIDs(fields, makeRandom) {
            const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
            let seed = randomInt(100000, 1000000);
            fields.forEach(_ => _.domid = makeRandom ? `${_.name}_random_${seed}` : _.name); // add random field IDs or names
        }

        onMounted(() => {
            const dt = FORMSDATA.find((_) => _.formDef.formId === props.formName).formDef;

            dt.fields.forEach(_ => !_.value && (_.value = '')); // create velue if skipped into definitions
            randomizeIDs(dt.fields, false); // so far we don't know stored state

            dataa.formId = dt.formId;
            dataa.formLabel = dt.label;
            dataa.watching.fields = dt.fields;
            dataa.dataFtypes = dt.fields.map(_ => _.dataFtype);
            dataa.formLogin = !!dt.formLogin; //dt.fields.length === 1;
            dataa.randomizeIds = !!dt.randomizeIds;
    
            dataa.loading = true;
            loadStore();
        });

        function fieldType(field) {
            return field.type === 'hidden' ? 'hidden' : dataa.watching.options.showPsws ? 'text' : field.type;
        }
        function fillValues(doValid) {
            if (dataa.watching.field_username === '') { // don't change existing name
                dataa.watching.field_username = 'maxzz';
            }
            dataa.watching.fields.forEach((_, index) => {
                if (dataa.dataFtypes[index] >= 0) {
                    const numb = dataa.dataFtypes[index] + (doValid ? 0: index);
                    _.value = `____ ${numb} ____`;
                }
            });
        }
        function onFillWrongValues() {
            fillValues(false);
        }
        function onFillRightValues() {
            fillValues(true);
        }
        function onClearValues() {
            dataa.watching.field_username = '';
            dataa.watching.fields.forEach((_, index) => dataa.dataFtypes[index] >= 0 && (_.value = ''));
        }
        function onSecondClick(e) {
            if (dataa.randomizeIds) {
                let isChecked = e.target.checked; // reactive dataa.watching.options.hasLogin is not updated yet since we have two event handlers
                randomizeIDs(dataa.watching.fields, isChecked);
            }
        }
        const secondChkText = computed(() => dataa.randomizeIds ? 'Randomized IDs' :  'Has corresponding login');
        const secondChkHint = computed(() => dataa.randomizeIds ? 'Randomize IDs on every check state changed and during loading' :  'Password change has corresponding login');

        return {
            ...toRefs(dataa),
            fieldType,
            onFillWrongValues,
            onFillRightValues,
            onClearValues,
            onSecondClick,
            secondChkText,
            secondChkHint,
        };
    }
});

Vue.component('data-forms', {
    template: '#data-forms',
    props: ['userForms'],
    setup() {
        const data = reactive({
            lastIndex: 10,
            loading: true,
            fields: [],
            vault: [],
        });

        onMounted(() => {
            function loadStore() {
                data.loading = true;
                let cnt = localStorage.getItem(STORAGE_DATAFORM);
                data.fields = parseFieldsFromString(cnt);
            }
            function loadVault() {
                let vault = localStorage.getItem(STORAGE_VAULT);
                vault = JSON.parse(vault || '[]');
                vault.forEach(_ => _.idx = data.lastIndex++);
                data.vault = vault;
            }

            loadStore();
            loadVault();
        });

        function saveStore() {
            let cnt = JSON.stringify(data.fields);
            localStorage.setItem(STORAGE_DATAFORM, cnt);
        }
        function saveVault() {
            localStorage.setItem(STORAGE_VAULT, JSON.stringify(data.vault));
        }

        watch(() => data.fields, () => data.loading ? (data.loading = false) : saveStore(), { deep: true });

        /* Fields */
        function parseFieldsFromString(cnt) {
            try {
                cnt = cnt && JSON.parse(cnt) || [];
            } catch(err) {
                cnt = [];
            }
            cnt.forEach(_ => _.idx = data.lastIndex++);
            return cnt;
        }
        function onAddField() {
            data.fields.push({
                value: `data ${data.lastIndex}`,
                password: false,
                idx: data.lastIndex++,
            });
        }
        function onDelField(idx) {
            let newFields = data.fields.filter(_ => _.idx != idx);
            data.fields = newFields; 
        }

        /* Vault */
        function vaultItemDispText(vaultItem) {
            let cnt = JSON.parse(vaultItem || '[]');
            return cnt.reduce((acc, _, i) => acc += `${!i?'':' + '}${_.password?'\uD83D\uDD12':''}'${_.value}'`, '');
        }
        function onAddToVault() {
            data.vault = [{
                data: JSON.stringify(data.fields),
                idx: data.lastIndex++,
            }, ...data.vault];
            saveVault();
        }
        function onDelFromVault(idx) {
            data.vault = data.vault.filter(_ => _.idx !== idx);
            saveVault();
        }
        function onSetFieldsFromVault(str) {
            data.fields = parseFieldsFromString(str);
        }

        return {
            ...toRefs(data),
            /* Fields */
            onAddField,
            onDelField,
            /* Vault */
            vaultItemDispText,
            onAddToVault,
            onDelFromVault,
            onSetFieldsFromVault,
        };
    }
});

Vue.component('forms-selector', {
    template: '#forms-selector',
    props: ['userForms'],
    /*
    setup(props) {
        let loading = true;

        function saveStore() {
            console.log('checks');
        }
        
        watch(() => props.userForms, () => loading ? (loading = false) : saveStore(), {deep: true});
        return {};
    }
    */
});

function main() {
    const userForms = ref([]);

    onMounted(() => {
        userForms.value = FORMSDATA.map(_ => _.checkboxes);
        loadStore();
    });

    let loading = true;
    watch(userForms, () => loading ? (loading = false) : saveStore(), {deep: true});

    function loadStore() {
        const storage = localStorage.getItem(STORAGE_SHOWFORMS);
        const stored = storage && JSON.parse(storage);
        if (stored) {
            const current = new Map(userForms.value.map(_ => [_.name, _]));
            stored.forEach(_ => {
                let currentItem = current.get(_[0]);
                if (currentItem) {
                    currentItem.show = !!_[1];
                }
            });
        }
    }

    function saveStore() {
        const map = JSON.stringify(userForms.value.map((_) => [_.name, +_.show]));
        localStorage.setItem(STORAGE_SHOWFORMS, map);
    }

    return {
        userForms,
    };
}

var vm = new Vue({
    el: '#app',
    setup(ctx) {
        return main(ctx);
    }
});

//console.log('api', window.vueCompositionApi);
