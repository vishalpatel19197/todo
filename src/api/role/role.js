const userModel = require("../user/userModel");
const { roleModel, roleUserModel } = require("./roleModel");

const Roles = [
  {
    roleId: 1,
    roleName: "Add user",
    key: "user_add",
    subId: 1,
  },
  {
    roleId: 2,
    roleName: "Edit user",
    key: "user_edit",
    subId: 1,
  },
  {
    roleId: 3,
    roleName: "Delete user",
    key: "user_delete",
    subId: 1,
  },
  {
    roleId: 4,
    roleName: "View user",
    key: "user_view",
    subId: 1,
  },
  {
    roleId: 5,
    roleName: "List user",
    key: "user_list",
    subId: 1,
  },
  {
    roleId: 6,
    roleName: "Add user role",
    key: "user_role_add",
    subId: 1,
  }
];

const addRoles = async () => {
  try {
    Roles.forEach(async (role) => {
      const existingRole = await roleModel.findOne({ key: role.key }).lean();
      if (!existingRole) {
        const newRole = new roleModel(role);
        await newRole.save();
        console.log(`Role ${role.roleName} added successfully.`);
      }
    });
  } catch (error) {
    console.error("Error adding roles:", error);
  }
};

addRoles();
