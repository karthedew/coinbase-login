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

contract AtlanticId is
    Context,
    AccessControlEnumerable,
    ERC721Burnable,
    ERC721Enumerable,
    ERC721Pausable
{
    using Counters for Counters.Counter;
    using DateTime for *;

    /** --- USER ROLES --- */
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /** LOCAL VARIABLES */
    Counters.Counter private _tokenIdTracker;   // Token Id Tracker
    string private _baseTokenURI;               // This URI should point to the public JSON data of the user
    struct AID {                                // (A)tlantic (Id)entification
        string name;                              //> | User's name
        string uid;                               //> | User's Identification Number
        string eid;                               //> | User's Exchange Identification Number
        string exchange;                          //> | Centralized Exchange where user's KYC info is registered
        Date expiry;                              //> | Expiration date - period of valid ID
    }
    /** The date holds the expiration of the valid AID. */
    struct Date {
        uint16 year;
        uint8 month;
        uint8 day;
    }
    /** --- TokenId mapped to User's Information */
    mapping(uint256 => AID) id_to_AID;

    constructor() ERC721("AtlanticId","AID") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
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
    function mint(
        string memory a_name,
        string memory a_uid,
        string memory a_eid,
        string memory a_exchange
    ) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        
        // --- Calculate the Expiration Date ---
        (uint16 now_year, uint8 now_month, uint8 now_day) = timestampToDate(block.timestamp);
        uint16 next_year = now_year + 1;
        Date memory a_expiry = Date({year:next_year, month: now_month, day: now_day});
        
        
        // --- Map the NFT IdNumber to the Data --- 
        id_to_AID[_tokenIdTracker.current()] = AID({
            name: a_name,
            uid: a_uid,
            eid: a_eid,
            exchange: a_exchange,
            expiry: a_expiry
        });
        
        _safeMint(msg.sender, _tokenIdTracker.current());
        _tokenIdTracker.increment();
    }


    /**
     * @dev Creates a timestamp of minted NFID.
     *
     * Requirements
     * ------------
     * none.
     *
     *
     * Parameters
     * ----------
     * timestamp : uint
     *      - The block timestep at the time this method should be called.
     */
    function timestampToDate(uint timestamp) public pure returns (uint16 year, uint8 month, uint8 day) {
        uint z = timestamp / 86400 + 719468;
        uint era = (z >= 0 ? z : z - 146096) / 146097;
        uint doe = z - era * 146097;
        uint yoe = (doe - doe/1460 + doe/36524 - doe/146096) / 365;
        uint doy = doe - (365*yoe + yoe/4 - yoe/100);
        uint mp = (5*doy + 2)/153;

        day = uint8(doy - (153*mp+2)/5 + 1);
        month = mp < 10 ? uint8(mp + 3) : uint8(mp - 9);
        year = uint16(yoe + era * 400 + (month <= 2 ? 1 : 0));
    }


    // --- OVERIDE PUBLIC ---
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


    // --- PRIVATE FUNCTIONS ---
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


    /**
        ==============================
        |   NFID SPECIFIC FUNTIONS   |
        ==============================


        TODO: Add isValidAid()  - This function could use Chainlink (recommended) to bring in the current date, 
                                  or the function could take in what the current date it is (not recommended).
        TODO: Add getExchange() - Returns the exchange of a user's KYC.
        TODO: Add getUid()      - Returns AID user ID.
        TODO: Add getEid()      - Returns the User's exchange ID.
     */

    function getExpiry(
        uint256 _tokenId
    ) public view
      returns (uint8 day, uint8 month, uint16 year)
    {
        AID memory user_aid = id_to_AID[_tokenId];
        Date memory user_date = user_aid.expiry;

        return (user_date.day, user_date.month, user_date.year);
    }

}