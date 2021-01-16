<template>
  <div class="pa-5">
    <v-data-table
    :headers="headers"
    :items="Admins"
    sort-by="calories"
    class="elevation-0"
  >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Admin Management</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add Admin
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0"
                    >
                      <v-text-field
                        outlined
                        dense
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0 pl-2"
                    >
                      <v-select
                      outlined
                      dense
                      v-model="editedItem.role"
                      :items="roleItems"
                      label="Role"
                      return-object
                      single-line
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0"
                    >
                      <v-text-field
                        outlined
                        dense
                        v-model="editedItem.phone"
                        label="Phone"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0 pl-2"
                    >
                      <v-text-field
                        outlined
                        dense
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0"
                    >
                      <v-select
                      outlined
                      dense
                      v-model="editedItem.status"
                      :items="statusItems"
                      label="Status"
                      return-object
                      single-line
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0 pl-2"
                    >
                      <v-text-field
                        outlined
                        dense
                        v-model="editedItem.password"
                        label="Password"
                        type="password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="300px">
            <v-card>
              <v-card-title class="headline">Are you sure?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="error darken-1" text @click="deleteItemConfirm">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import constants from '../constants';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    statusItems: ['Active', 'Deactive'],
    roleItems: Object.values(constants.adminRoles),
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Role', value: 'role' },
      { text: 'Phone', value: 'phone' },
      { text: 'Email', value: 'email' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    admins: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      role: '',
      phone: '',
      email: '',
      status: '',
    },
    defaultItem: {
      name: '',
      role: '',
      phone: '',
      email: '',
      status: '',
    },
  }),

  computed: {
    ...mapGetters(['Admins']),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions(['ALL_ADMINS_REQUEST', 'ADD_ADMIN_REQUEST']),
    async initialize() {
      try {
        await this.ALL_ADMINS_REQUEST();
      } catch (err) {
        // console.log(err);
      }
    },

    editItem(item) {
      this.editedIndex = this.Admins.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Admins.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Admins.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    async addAdmin(admin) {
      try {
        // eslint-disable-next-line no-param-reassign
        admin.phone = `88${admin.phone}`;
        await this.ADD_ADMIN_REQUEST(admin);
        this.$toast.success('Admin added successfully');
      } catch (err) {
        // console.log(err);
      }
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.Admins[this.editedIndex], this.editedItem);
      } else {
        this.addAdmin(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
