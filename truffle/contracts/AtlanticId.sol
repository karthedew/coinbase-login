// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Context.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "./DateTime.sol";

/**
TODO: Add EVENTS
TODO: Change Transfer functions
TODO: Add AtlanticId Functions
 */

contract AtlanticId is
    Context,
    AccessControlEnumerable,
    ERC721Burnable,
    ERC721Enumerable,
    ERC721Pausable
{
    //** LIBRARIES */
    using Counters for Counters.Counter;
    using DateTime for DateTime._DateTime;
    // using DateTime for *;

    /** --- USER ROLES --- */
    bytes32 public constant MINTER_ROLE   = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE   = keccak256("PAUSER_ROLE");
    bytes32 public constant BURNER_ROLE   = keccak256("BURNER_ROLE");
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");

    /** LOCAL VARIABLES */
    string private key;
    address atlanticIdOwner;
    Counters.Counter private _tokenIdTracker;   // Token Id Tracker
    string private _baseTokenURI;               // This URI should point to the public JSON data of the user
    struct AID {                                // (A)tlantic (Id)entification
        string ens;                               //> | User's name
        string uid;                               //> | User's Identification Number
        string exchange;                          //> | Centralized Exchange where user's KYC info is registered
        DateTime._DateTime expiry;                //> | Expiration date - period of valid ID
    }
    mapping(uint256 => AID) id_to_AID;          // TokenId mapped to User's Information
    mapping(address => string) approved_key;    // Checks if address has an approved key.

    /** CONSTRUCTOR */
    constructor() ERC721("AtlanticId","AID") {
        atlanticIdOwner = msg.sender;
        // --- SET ROLES ---
        _setupRole(MINTER_ROLE, atlanticIdOwner);
        _setupRole(PAUSER_ROLE, atlanticIdOwner);
        _setupRole(BURNER_ROLE, atlanticIdOwner);
        _setupRole(TRANSFER_ROLE, atlanticIdOwner);
    }

    // ===================================================
    /** --- ERC-721 FUNCTIONS OVERRIDE & INITIALIZE --- */
    // ===================================================
    /**
    FUNCTIONS
    ---------
        > _baseURI()
        > supportsInterface()
        > unpause()
        > _beforeTokenTransfer()
    
    TRANSFER FUNCTIONS
    ------------------
        > 
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to unpause");
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override
      
    {
        
    }



    // ==============================
    /** ATLANTICID SPECIFIC FUNCTIONS */
    /**
    FUNCTIONS
    ---------
        > approveMint()
        > mint()
     */

    function approveMint(string memory _key, address from) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721ApprovedMint: must have MINTER_ROLE or be owner to allow minting.");
        approved_key[from] = _key;
    }


    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     *
     *
     * TODO: 
     *  - Add approved wallet access by contract owner.
     */
    function mint(
        string memory _ens,
        string memory _uid,
        string memory _exchange,
        string memory _key
    ) public
      hasKey(msg.sender, _key)
    {
        // STEP 1: Require MINTER_ROLE & _key
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        
        uint256 _tokenId = _tokenIdTracker.current();
        // STEP 2: Calculate the Expiration Date
        // --- Calculate the Expiration Date ---
        DateTime._DateTime memory _expiry = DateTime.parseTimestamp(block.timestamp);

        // STEP 3: Create Mapping
        // --- Map the NFT IdNumber to the Data --- 
        id_to_AID[_tokenIdTracker.current()] = AID({
            ens: _ens,
            uid: _uid,
            exchange: _exchange,
            expiry: _expiry
        });

        // STEP 4: Mint NFID
        _safeMint(msg.sender, _tokenId);

        // SETUP 5: Allow atlanticIdOwner to Manage NFT
        approve(atlanticIdOwner, _tokenId);
        _tokenIdTracker.increment();

        // STEP 6: Delete _key
        delete approved_key[msg.sender];
    }


    /**
        ==============================
        |   NFID SPECIFIC FUNTIONS   |
        ==============================
        TODO: Add isValidAid()  - This function could use Chainlink (recommended) to bring in the current date, 
                                  or the function could take in what the current date it is (not recommended).
        TODO: Add getUid()      - Returns AID user ID.
     */

    function getExpiry(
        uint256 _tokenId
    ) public view
      returns (uint8 day, uint8 month, uint16 year)
    {
        AID memory user_aid = id_to_AID[_tokenId];
        DateTime._DateTime memory user_date = user_aid.expiry;

        return (user_date.day, user_date.month, user_date.year);
    }

    function isValidAid() public view {

    }


    /** MODIFIERS */
    // keccak256(abi.encodePacked(a)
    modifier hasKey(address _sender, string memory _key) {
      if (keccak256(abi.encodePacked(approved_key[_sender])) == keccak256(abi.encodePacked(_key))) {
         _;
      }
   }

}