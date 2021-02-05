import firebase from "firebase/app";

export default {
    actions: {
        async creatRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid');
                const path = `/users/${uid}/records`;
                return await firebase.database().ref(path).push(record);
            } catch (e) {
              commit('setError', e);
              throw e;
            }
        }
    }
}