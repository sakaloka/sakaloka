export default class ProfilePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async loadProfile() {
    const profile = await this.#model.get('profile');
    if (profile) this.#view.showProfile(profile);
  }

  async saveProfile(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const photoFile = formData.get('photo');

    let photoUrl = '';
    if (photoFile && photoFile.size > 0) {
      photoUrl = URL.createObjectURL(photoFile);
    }

    const profile = {
      name,
      email,
      password,
      photo: photoUrl,
    };

    await this.#model.put('profile', profile);
    alert('Profil berhasil disimpan!');
  }
}
