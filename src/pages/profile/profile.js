import { html, render } from 'lit-html';
import ProfilePresenter from './profile-presenter.js';
import { toast } from '../../components/utils/toast.js';

export function renderProfile(container) {
  let presenter = null;

  presenter = new ProfilePresenter({
    view: {
      showSuccess: (msg) => toast(msg, 'success'),
      showError: (msg) => toast(msg, 'error'),
      showProfile: (user) => {
        const template = html`
          <section class="w-full mx-auto px-4 py-6 space-y-8 mt-24">
            <h2 class="text-2xl font-bold text-gray-800">Profil Saya</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Form Profil -->
              <form
                id="profile-form"
                class="bg-white border border-black rounded-lg shadow-sm p-6 space-y-4"
              >
                <h3 class="text-lg font-semibold text-black-700">Informasi Pengguna</h3>

                <div class="flex items-center gap-4">
                  <div
                    class="w-16 h-16 rounded-full overflow-hidden bg-[#bea5a5] flex items-center justify-center text-white text-xl"
                  >
                    ${user.previewPhotoUrl
                      ? html`<img
                          src="${user.previewPhotoUrl}"
                          class="w-full h-full object-cover"
                          alt="Avatar"
                        />`
                      : html`<i class="fa fa-user text-black "></i>`}
                  </div>
                  <div class="font-medium text-gray-800" id="display-name">${user.name || '-'}</div>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm text-gray-600">Nama</label>
                  <input
                    type="text"
                    id="input-name"
                    class="w-full border px-3 py-2 rounded text-sm"
                    value="${user.name || ''}"
                    placeholder="Masukkan nama"
                  />
                </div>

                <button
                  type="submit"
                  class="w-full bg-[#3c2b2b] text-white py-2 rounded hover:bg-[#4a3838]"
                >
                  Simpan Perubahan
                </button>
              </form>

              <!-- Form Foto -->
              <form
                id="photo-form"
                class="bg-white border border-black rounded-lg shadow-sm p-6 space-y-4"
              >
                <h3 class="text-lg font-semibold text-black-700">Foto Profil</h3>

                <div
                  class="w-32 h-32 rounded-full bg-[#bea5a5] overflow-hidden flex items-center justify-center mx-auto"
                >
                  ${user.previewPhotoUrl
                    ? html`<img
                        src="${user.previewPhotoUrl}"
                        class="w-full h-full object-cover"
                        alt="Foto Profil"
                      />`
                    : html`<i class="fa fa-image text-4xl text-black-400"></i>`}
                </div>

                <div class="text-center mt-2">
                  <label
                    for="photo-input"
                    class="cursor-pointer text-sm text-blue-600 hover:underline"
                  >
                    Pilih Foto
                  </label>
                  <input type="file" id="photo-input" class="hidden" accept="image/*" />
                </div>

                <button
                  type="submit"
                  class="w-full bg-[#3c2b2b] text-white py-2 rounded hover:bg-[#4a3838]"
                >
                  Simpan Foto
                </button>
              </form>
            </div>
          </section>
        `;

        render(template, container);
        presenter.attachEvents();
      },
    },
  });

  presenter.loadProfile();
}
