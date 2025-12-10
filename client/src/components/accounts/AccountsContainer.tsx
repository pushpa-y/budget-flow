import { useState, useEffect } from "react";
import { useAccounts } from "../../context/AccountsContext";
import type { Account } from "../../services/accounts";

import {
  AccountsCard,
  AccountsWrapper,
  AccountItem,
  DotsWrapper,
  AccountMenu,
  MenuItem,
  AddAccountButton,
  AllAccountsLink,
} from "../../styles/Dashboard";

import { AddAccountModal } from "../modals/AddAccountModal";
import { EditAccountModal } from "../modals/EditAccountModal";
import ConfirmationModal from "../modals/ConfirmationModal";

const AccountsContainer = () => {
  const {
    accounts,
    activeAccount,
    setActiveAccount,
    deleteAccount,
    updateAccount,
  } = useAccounts();

  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAccountData, setEditAccountData] = useState<Account | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (!confirmDeleteId) return;

    await deleteAccount(confirmDeleteId);
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const close = () => setMenuOpenFor(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <>
      <AccountsCard>
        <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
          Your Accounts
        </h3>

        <AccountsWrapper>
          {accounts.map((acc) => (
            <AccountItem
              key={acc._id}
              $active={activeAccount === acc._id || activeAccount === "all"}
              onClick={() => {
                setActiveAccount(acc._id);
                localStorage.setItem("activeAccount", acc._id);
              }}
            >
              <span>{acc.name}</span>
              <span>₹{acc.balance.toLocaleString()}</span>

              {/* 3 dots */}
              <DotsWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpenFor(acc._id);
                }}
              >
                ⋮
              </DotsWrapper>

              {menuOpenFor === acc._id && (
                <AccountMenu>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenFor(null);
                      setEditAccountData(acc);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </MenuItem>

                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenFor(null);
                      setConfirmDeleteId(acc._id);
                      setShowConfirmModal(true);
                    }}
                  >
                    Delete
                  </MenuItem>
                </AccountMenu>
              )}
            </AccountItem>
          ))}

          <AddAccountButton onClick={() => setIsAddModalOpen(true)}>
            + Add Account
          </AddAccountButton>
        </AccountsWrapper>

        {/* Select All Accounts */}
        <AllAccountsLink
          onClick={() => {
            setActiveAccount("all");
            localStorage.setItem("activeAccount", "all");
          }}
        >
          Select All Accounts
        </AllAccountsLink>
      </AccountsCard>

      {/* Modals */}
      <AddAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {editAccountData && (
        <EditAccountModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          account={editAccountData}
          onSave={async (data) => {
            await updateAccount(editAccountData._id, data);
            setIsEditModalOpen(false);
          }}
        />
      )}

      <ConfirmationModal
        open={showConfirmModal}
        title="Delete Account?"
        message="Are you sure? This cannot be undone."
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
};

export default AccountsContainer;
